const environments = {};

// default
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging'
};

environments.production = {
  httpPort: 5000,
  httpsPort: 5002,
  envName: 'production'
};

const currentEnv =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

const environmentToExport =
  typeof environments[currentEnv] === 'object'
    ? environments[currentEnv]
    : environments.staging;

// don't export everything
module.exports = environmentToExport;
