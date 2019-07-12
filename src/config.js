const NODE_ENV = process.env.NODE_ENV || 'development';
console.log('NODE_ENV ', NODE_ENV);

const config = {
  apiURL: NODE_ENV === 'development' ? '' : ''
};

export default {
  ...config
};
