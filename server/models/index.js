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
db.nacionalidades = require("./nacionalidad")(database, Sequelize);
db.citas = require("./cita")(database, Sequelize);
db.usuario_cita_trabajador = require("./cita_usuario_trabajador")(database, Sequelize);
db.casos = require("./caso")(database, Sequelize);
db.discriminaciones = require("./discriminacion")(database, Sequelize);
db.trabajadoras_hogar = require("./trabajadorahogar")(database, Sequelize);
db.internas = require("./interna")(database, Sequelize);
db.externas = require("./externa")(database, Sequelize);
db.extranjerias = require("./extranjeria")(database, Sequelize);
db.necesidadextranjeria = require("./necesidadextranjeria")(database, Sequelize);
db.proyectoextranjeria = require("./proyectoextranjeria")(database, Sequelize);
db.intervenciones = require("./intervencion")(database, Sequelize);
db.documentos = require("./documento")(database, Sequelize);

db.sedes.belongsToMany(db.trabajadores, {through: 'Trabajador_sede', foreignKey: 'SedeId'})
db.trabajadores.belongsToMany(db.sedes,{through: 'Trabajador_sede', foreignKey: 'TrabajadorId'})

db.sedes.hasMany(db.usuarios, {foreignKey: 'sedeId'})
db.trabajadores.hasMany(db.usuarios, {foreignKey: 'trabajadorId'})

db.usuarios.belongsTo(db.sedes, {foreignKey: 'sedeId'})
db.usuarios.belongsTo(db.trabajadores, {foreignKey: 'trabajadorId'})

db.citas.hasMany(db.usuario_cita_trabajador, {foreignKey: 'citaId', onDelete: 'cascade'})
db.trabajadores.hasMany(db.usuario_cita_trabajador, {foreignKey: 'trabajadorId',onDelete: 'cascade'})
db.usuarios.hasMany(db.usuario_cita_trabajador, {foreignKey: 'n_documentacion',onDelete: 'cascade'})
db.usuario_cita_trabajador.belongsTo(db.citas, {foreignKey: 'citaId'})
db.usuario_cita_trabajador.belongsTo(db.trabajadores, {foreignKey: 'trabajadorId'})
db.usuario_cita_trabajador.belongsTo(db.usuarios, {foreignKey: 'n_documentacion'})

db.trabajadores.hasMany(db.casos, {foreingKey: 'trabajadorId'})
db.casos.belongsTo(db.trabajadores, {foreignKey: 'trabajadorId'})

db.usuarios.hasMany(db.casos, {foreingKey: 'n_documentacion'})
db.casos.belongsTo(db.usuarios, {foreignKey: 'n_documentacion', as: 'usuarioId'})

db.casos.hasMany(db.discriminaciones, {foreignKey: 'casoId', onDelete: 'cascade'})
db.casos.hasMany(db.trabajadoras_hogar, {foreignKey: 'casoId', onDelete: 'cascade'})
db.casos.hasMany(db.extranjerias, {foreignKey: 'casoId', onDelete: 'cascade'})
db.casos.hasMany(db.proyectoextranjeria, {foreignKey: 'casoId', onDelete: 'cascade'})
db.casos.hasMany(db.necesidadextranjeria, {foreignKey: 'casoId', onDelete: 'cascade'})
db.casos.hasMany(db.internas, {foreignKey: 'casoId', onDelete: 'cascade'})
db.casos.hasMany(db.externas, {foreignKey: 'casoId', onDelete: 'cascade'})
db.discriminaciones.belongsTo(db.casos, {foreignKey: 'casoId'})
db.trabajadoras_hogar.belongsTo(db.casos, {foreignKey: 'casoId'})
db.extranjerias.belongsTo(db.casos,{foreignKey: 'casoId'})

db.casos.hasMany(db.intervenciones, {foreignKey:'casoId', onDelete: 'cascade'})
db.intervenciones.belongsTo(db.casos,{foreignKey:'casoId'})

db.intervenciones.hasMany(db.documentos, {foreignKey:'intervencionId', onDelete: 'cascade'})
db.documentos.belongsTo(db.intervenciones,{foreignKey:'intervencionId'})

db.usuarios.hasMany(db.nacionalidades, {foreignKey: 'n_documentacion', onDelete: 'cascade'})
db.nacionalidades.belongsTo(db.usuarios, {foreignKey: 'n_documentacion'})
module.exports = db;

