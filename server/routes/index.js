const trabajador = require("../controllers/trabajador");
const sede = require("../controllers/sede");
const usuario = require("../controllers/usuario");
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
// // Retrieve all Usuarios
router.get("/usuarios/all/:email", usuario.getAllUsuarios);
// // Retrieve Usuario by n_documentacion
router.put("/usuario/getByEmail", usuario.getUsuarioWithDocumentacion);
// // Retrieve distinct nationalities
router.get("/usuarios/nacionalidad/:email", usuario.getAllNationalities);


module.exports = router;