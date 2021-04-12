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
db.citas = require("./cita")(database, Sequelize);
db.usuario_cita_trabajador = require("./cita_usuario_trabajador")(database, Sequelize);
db.casos = require("./caso")(database, Sequelize);
db.discriminaciones = require("./discriminacion")(database, Sequelize);
db.trabajadoras_hogar = require("./trabajadorahogar")(database, Sequelize);
db.internas = require("./interna")(database, Sequelize);
db.externas = require("./externa")(database, Sequelize);
db.extranjerias = require("./extranjeria")(database, Sequelize);
db.necesidadextranjeria = require("./necesidadextranjeria")(database, Sequelize);
db.intervenciones = require("./intervencion")(database, Sequelize);
db.documentos = require("./documento")(database, Sequelize);

db.trabajadores.belongsTo(db.sedes, {foreignKey: 'sedeId', as: 'id_sede'})
db.usuarios.belongsTo(db.sedes, {foreignKey: 'sedeId', as: 'id_sede'})
db.usuarios.belongsTo(db.trabajadores, {foreignKey: 'trabajadorId', as: 'id_trabajador'})

db.usuario_cita_trabajador.belongsTo(db.citas, {foreignKey: 'id', as: 'citaId'})
db.usuario_cita_trabajador.belongsTo(db.trabajadores, {foreignKey: 'trabajadorId'})
db.usuario_cita_trabajador.belongsTo(db.usuarios, {foreignKey: 'n_documentacion', as: 'usuarioID'})
db.ROLES = ["trabajador", "admin"];

db.casos.belongsTo(db.trabajadores, {foreignKey: 'trabajadorId', as: 'id_trabajador'})
db.casos.belongsTo(db.usuarios, {foreignKey: 'n_documentacion', as: 'usuarioId'})
db.discriminaciones.belongsTo(db.casos, {foreignKey: 'id', as: 'casoId'})
db.trabajadoras_hogar.belongsTo(db.casos, {foreignKey: 'id', as: 'casoId'})
db.extranjerias.belongsTo(db.casos, {foreignKey: 'id', as: 'casoId'})
db.externas.belongsTo(db.trabajadoras_hogar,{foreignKey:'id', as:'internaId'})
db.internas.belongsTo(db.trabajadoras_hogar,{foreignKey:'id', as:'externaId'})
db.necesidadextranjeria.belongsTo(db.extranjerias,{foreignKey:'id', as:'necesidadId'})

db.intervenciones.belongsTo(db.casos,{foreignKey:'casoId', as:'caso'})
db.documentos.belongsTo(db.intervenciones,{foreignKey:'intervencionId', as:'intervencion'})
module.exports = db;

