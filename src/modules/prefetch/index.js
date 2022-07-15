import createPrefetchComponent from './PrefetchComponent';

const prefetch = options => InputComponent => {
  const PrefetchComponent = createPrefetchComponent(options, InputComponent);

  return PrefetchComponent;
};

export default prefetch;
