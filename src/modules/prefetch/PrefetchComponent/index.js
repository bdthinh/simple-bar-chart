import React, { Component } from 'react';
import { path } from 'lodash/fp';

import { get } from '../../fetch';
import wait from '../../wait';

import './index.scss';

function initialResponses(fetchOptions) {
  const responses = {};

  fetchOptions.forEach(option => {
    const { initValue, name } = option;
    const resource = {
      data: initValue,
      state: 'pending',
      errors: [],
    };
    responses[name] = resource;
  });
  return responses;
}

const PrefetchComponent = (fetchOptions, InputComponent) =>
  class _ extends Component {
    _isMounted = false;

    constructor(props) {
      super(props);
      this.state = { fetchResponses: initialResponses(fetchOptions) };
    }

    componentDidMount() {
      this._isMounted = true;

      fetchOptions.forEach(option => this.fetchUrl(option));
    }

    fetchUrl(fetchOption) {
      const { params, respRoot, name, url } = fetchOption;

      return get(url, params)
        .then(async json => {
          await wait(1000);
          const { fetchResponses } = this.state;
          const fetchResponse = fetchResponses[name];

          const data = respRoot ? path(respRoot, json) : json;

          if (this._isMounted) {
            this.setState({
              fetchResponses: { ...fetchResponses, [name]: { ...fetchResponse, data, state: 'success', errors: [] } },
            });
          }
        })
        .catch(json => {
          const { fetchResponses } = this.state;
          const fetchResponse = fetchResponses[name];

          if (this._isMounted) {
            this.setState({
              fetchResponses: { ...fetchResponses, [name]: { ...fetchResponse, errors: json, state: 'failure' } },
            });
          }
        });
    }

    render() {
      let errors = [];
      let isLoading = true;

      const resources = {};
      const { fetchResponses } = this.state;

      for (const name in fetchResponses) {
        const fetchResponse = fetchResponses[name];

        if (fetchResponse.state !== 'pending') {
          isLoading = false;
        }
        resources[name] = fetchResponse.data;
        errors = [...errors, ...fetchResponse.errors];
      }

      return (
        <div key="wrapper" className="prefetch-wrapper" data-loading={isLoading}>
          <InputComponent {...resources} {...this.props} errors={errors} />
          {isLoading && <div key="skeleton" className="skeleton" />}
        </div>
      );
    }
  };

export default PrefetchComponent;
