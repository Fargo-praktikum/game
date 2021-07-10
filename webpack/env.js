function getClientEnvironment() {
  const stringified = {
    'process.env': Object.keys(process.env).reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key]);
      return env;
    }, {}),
  };

  return { stringified };
}

module.exports = getClientEnvironment;
