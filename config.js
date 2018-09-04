const environments = {};

// default
environments.staging = {
  port: 3000,
  envName: 'staging'
};

environments.production = {
  port: 5000,
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

module.exports = environmentToExport;
