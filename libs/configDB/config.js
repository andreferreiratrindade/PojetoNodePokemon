// Recupera arquivo de configuraçã do banco de dados compativel com o ambiente
module.exports = app => {
    const env = process.env.NODE_ENV;
    if (env) {
      return require(`./config.${env}.js`);
    }
    return require("./config.development");
  };