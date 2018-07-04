const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

let db = null;
module.exports = app => {

  if (!db) {
    const configDB = app.libs.configDB.config;

    const sequelize = new Sequelize(
      configDB.database,
      configDB.username,
      configDB.password,
      {
        host: configDB.host,
        dialect: configDB.dialect,
        schema: configDB.schema,
        dialectOptions: {
          encrypt: configDB.encrypt
        },
        logging: false
      });

    db = {
      sequelize,
      Sequelize,
      models: {}
    };
    const dir = path.join(__dirname, "../src/models");

    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file);
      const model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });

  }
  return db;
};
