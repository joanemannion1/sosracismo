const trabajador = require("../controllers/trabajador");
const sede = require("../controllers/sede");
const usuario = require("../controllers/usuario");
const cita = require("../controllers/cita");
const express = require("express");
const router = express.Router();

// Create New trabajador
router.post("/trabajador/create" ,trabajador.create);
// // Retrieve all trabajadores
router.get("/trabajadores/all", trabajador.getAllTrabajadores);
// Retrieve trabajador by email
router.get("/trabajador/:email", trabajador.getTrabajadorByEmail);
// // Update trabajador by email
router.put("/trabajador/update", trabajador.updatePasswordByEmail);
// // Delete trabajador by email
router.delete("/trabajador/delete/:email", trabajador.deleteTrabajadorByEmail);
// Delete all trabajadores
router.delete("/trabajadores/deleteAll", trabajador.deleteAllTrabajadores);
//Log in trabajador
router.post("/trabajador/login", trabajador.logIn);

// Create New sede
router.post("/sede/create", sede.create);
// // Retrieve all sedes
router.get("/sedes/all", sede.getAllSedes);

// Create New User
router.post("/usuario/create" ,usuario.create);
// // Retrieve all Usuarios of a Trabajador
router.get("/usuarios/all/:email", usuario.getAllUsuarios);
// // Retrieve Usuario by n_documentacion
router.put("/usuario/getByEmail", usuario.getUsuarioWithDocumentacion);
// // Retrieve distinct nationalities
router.get("/usuarios/nacionalidad/:email", usuario.getAllNationalities);


//Create new Cita
router.post("/cita/create" , cita.create);
// // Retrieve all Citas of a Trabajador
router.get("/citas/all", cita.getAllCitas);
// // Delete cita by id
router.delete("/cita/delete/:id", cita.deleteCita);


module.exports = router;