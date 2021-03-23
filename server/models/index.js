const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.databaseConf = database;
// function to drop existing tables and re-sync database
// db.dropRestApiTable = () => {
//   db.databaseConf.sync({ force: true }).then(() => {
//     console.log("restTutorial table just dropped and db re-synced.");
//   });
// };
db.trabajadores = require("./trabajador")(database, Sequelize);
db.sedes = require("./sede")(database, Sequelize);
db.usuarios = require("./usuario")(database, Sequelize);

db.trabajadores.belongsTo(db.sedes, {foreignKey: 'sedeId', as: 'id_sede'})
db.usuarios.belongsTo(db.sedes, {foreignKey: 'sedeId', as: 'id_sede'})
db.usuarios.belongsTo(db.trabajadores, {foreignKey: 'trabajadorId', as: 'id_trabajador'})

db.ROLES = ["trabajador", "admin"];

module.exports = db;

