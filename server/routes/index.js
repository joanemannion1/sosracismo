
const sede = require("../controllers/sede");
const usuario = require("../controllers/usuario");
const cita = require("../controllers/cita");
const caso = require("../controllers/caso");
const intervencion = require("../controllers/intervencion");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require("../config/auth.config.js");
const trabajador = require("../controllers/trabajador");

const verifyJWT = (req,res,next) => {
    const token = req.headers['x-access-token']
    // const token = req.params.token
    if (token === 'null') {
        res.status(400).send({auth: false, message: "El token es nulo"})
    } else {
        jwt.verify(token,  config.secret, (err, decoded) => {
            if (err) {
                res.status(400).send({auth: false, message: "No se ha podido autenticar usuario"});
            } else {
                res.status(200).send({auth: true, message: "Estar correctamente autenticado",  email : decoded.email, admin: decoded.admin});
            }
        })
    }
}
// Create New trabajador
router.post("/trabajador/create" , trabajador.create);
// // Retrieve all trabajadores
router.get("/trabajadores/all", trabajador.getAllTrabajadores);
// Retrieve trabajador by email
router.get("/trabajador/:email", trabajador.getTrabajadorByEmail);
// // Update trabajador by email
router.put("/trabajador/update", trabajador.updatePasswordByEmail);
// // Delete trabajador by email
router.delete("/trabajador/delete/:email", trabajador.deleteTrabajadorByEmail);
// Delete all trabajadores
// router.delete("/trabajadores/deleteAll", trabajador.deleteAllTrabajadores);
//Log in trabajador
router.post("/trabajador/login", trabajador.logIn);
//Log in trabajador
router.get("/authenticate/trabajador/", verifyJWT);

// Create New sede
router.post("/sede/create", sede.create);
// // Retrieve all sedes
router.get("/sedes/all", sede.getAllSedes);

// Create New User
router.post("/usuario/create" ,usuario.create);
// Create New User
router.post("/usuario/update/:id" ,usuario.update);
// // Retrieve all Usuarios of a Trabajador
router.get("/usuarios/all/:email", usuario.getAllUsuarios);
// // Retrieve Usuario by n_documentacion
router.get("/usuario/getByDocumentacion/:ndoc", usuario.getUsuarioWithDocumentacion);
// // Check if phone number already exists
router.get("/usuario/checkTelefono/:telefono", usuario.checkTelefono);
// // Retrieve distinct nationalities
router.get("/usuarios/nacionalidad/:email", usuario.getAllNationalities);
// // Retrieve distinct sedes
router.get("/usuarios/sede/:email", usuario.getAllSedes);
// Get number of users by necesidades for excel
router.get("/usuarios/count/nacionalidad", usuario.getCountUserByNationalities);
// Get number of users by necesidades for excel
router.get("/usuarios/count/necesidad", usuario.getCountUserByNecesidad);
//Delete user by nº documentación
router.delete("/usuario/delete/:ndoc", usuario.deleteByNDoc)

//Create new Cita
router.post("/cita/create" , cita.create);
// // Retrieve all Citas of a Trabajador
router.get("/citas/all", cita.getAllCitas);
// // Delete cita by id
router.delete("/cita/delete/:id", cita.deleteCita);

//Create new Caso Discriminacion
router.post("/caso/create/discriminacion" , caso.createDiscriminacion);
//Update Caso Discriminacion
router.post("/caso/update/discriminacion/:id" , caso.updateDiscriminacion);
//Create new Caso TrabajadoraHogar
router.post("/caso/create/trabajadoraHogar" , caso.createTrabajadoraHogar);
//Update Caso Discriminacion
router.post("/caso/update/trabajadoraHogar/:id" , caso.updateTrabajadoraHogar);
//Create new Caso Extranjeria
router.post("/caso/create/extranjeria" , caso.createExtranjeria);
//Update Caso Discriminacion
router.post("/caso/update/extranjeria/:id" , caso.updateExtranjeria);
// // Retrieve all Casos of a Trabajador
router.get("/casos/all/:email", caso.getAllCasos);
// // Retrieve all Casos of a Trabajador
router.get("/casos/allActive/:email", caso.getAllCasosNoFinalizados);
// // Retrieve Casos by Id
router.get("/caso/:id", caso.getCasoById);
// // Retrieve Caso Especifico by Id
router.get("/casoEspecifico/discriminacion/:id", caso.getCasoEspecificoDiscriminacionId);
// // Retrieve Caso Especifico by Id
router.get("/casoEspecifico/trabajadora/:id", caso.getCasoEspecificoTrabajadoraId);
// // Retrieve Caso Especifico by Id
router.get("/casoEspecifico/extranjeria/:id", caso.getCasoEspecificoExtranjeriaId);
// // Retrieve Necesidades de un caso by Id
router.get("/necesidad/:id", caso.getNecesidadExtranjeriaId);
// // Retrieve Proyectos de un Caso by Id
router.get("/proyecto/:id", caso.getProyectoExtranjeriaId);
// // Retrieve Caso Especifico by Id
router.get("/casoType/:id", caso.getCasoType);
// // Retrieve Necesidad with User Id
router.post("/necesidadUsuario/", caso.getNecesidadWithUser);
// // Finalizar Caso Especifico by Id
router.get("/caso/finalizar/:id", caso.finalizarCaso);
//Delete intervención by id
router.delete("/caso/delete/:id", caso.deleteById)

//Create new Intervencion
router.post("/intervencion/createdoc", intervencion.createDoc)
//Delete intervención by id
router.delete("/intervencion/delete/:id", intervencion.deleteById)
// //Download file by path
router.get("/file/download/:id" ,intervencion.downloadFileByName)
// //Get intervencion by id
router.get("/intervenciones/caso/:casoId" ,intervencion.getAllByCaso)

module.exports = router;