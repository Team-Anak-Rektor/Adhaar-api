"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const dbConfig = require("../config/config");
const db = {};

let sequelize;
sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  dialect: dbConfig.dialect,
  host: dbConfig.HOST,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  },
  dialectOptions: {
      socketPath: "/cloudsql/adhaar-351813:us-central1:adhaar-sql"
  },
  logging: false,
  operatorsAliases: false
});
//testing connect
// sequelize.authenticate().then(()=>{
//   console.log("connect")
// }).catch((err)=> console.log(err, "eror"))

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;