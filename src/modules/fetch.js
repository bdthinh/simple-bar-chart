import inflection from 'inflection';
import { reduce } from 'lodash';

const throttleLimiter = { url: Date.now() };

export function parseJSON(response) {
  const json = response.json();

  if (response.status >= 200 && response.status < 300) {
    return json;
  }

  if (response.staus === 403) {
    // eslint-disable-next-line
    return json.then(err => Promise.reject({ code: 403, reason: err }));
  }

  return json.then(err => Promise.reject(err));
}

function isString(value) {
  return typeof value === 'string';
}

function isArray(value) {
  return Array.isArray(value);
}

function isNumber(value) {
  return Number.isInteger(value);
}

export function isObject(value) {
  return value != null && typeof value === 'object';
}

function isDate(value) {
  return value instanceof Date;
}

export function normalize(data) {
  // eslint-disable-next-line
  let results = isArray(data) ? [] : {};

  if (isArray(data)) {
    results = data.map(value => (isObject(value) ? normalize(value) : value));
  } else {
    Object.keys(data).forEach(key => {
      const value = data[key];
      const nv = isObject(value) ? normalize(value) : value;
      // eslint-disable-next-line
      results[isNumber(key) ? key : inflection.camelize(key, true)] = nv;
    });
  }

  return results;
}

function denormalize(data) {
  // eslint-disable-next-line
  let results = isArray(data) ? [] : {};

  if (isArray(data)) {
    results = data.map(value => (isObject(value) ? denormalize(value) : value));
  } else if (isObject(data)) {
    Object.keys(data).forEach(key => {
      const value = data[key];

      let dnv = value;
      if (isDate(value)) {
        dnv = value.toJSON();
      } else if (isObject(value)) {
        dnv = denormalize(value);
      }
      // eslint-disable-next-line
      results[underscoreKey(key)] = dnv;
    });
  }

  return results;
}

function underscoreKey(key) {
  // eslint-disable-next-line
  let udkey;

  if (isString(key)) {
    udkey = inflection.underscore(key);
    if (key.startsWith('_')) udkey = `_${udkey}`;
  } else {
    udkey = key;
  }

  return udkey;
}

const handleError = e => {
  if (e.name === 'TypeError' && e.message.match(/Failed to execute 'fetch' on 'Window'/)) {
    // eslint-disable-next-line
    document.location.href = '/';
    return true;
  }
  return Promise.reject(e);
};

export const compactUndefined = params =>
  reduce(
    params,
    (result, value, key) => {
      if (value !== undefined) {
        // eslint-disable-next-line
        result[key] = value;
      }
      return result;
    },
    {},
  );

export function request(path, params) {
  /* eslint-disable */
  params.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(params.headers || {}),
  };

  /* eslint-enable */
  const url = `${process.env.REACT_APP_API_URL}${path}`;
  console.log('url', url);

  return fetch(url, params)
    .then(parseJSON)
    .then(json => normalize(json))
    .catch(handleError);
}

export function get(path, params, throttle = false, delay = 1000) {
  const normalizeParams = denormalize(compactUndefined(params));
  const body = Object.keys(normalizeParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(normalizeParams[key])}`)
    .join('&')
    .replace(/%20/g, '+');
  const url = body ? `${path}?${body}` : path;

  if (throttle && throttleLimiter[url] > Date.now() - delay) {
    return Promise.resolve({ throttled: true });
  }
  // eslint-disable-next-line
  throttleLimiter[url] = Date.now();

  return request(url, { method: 'GET' });
}
