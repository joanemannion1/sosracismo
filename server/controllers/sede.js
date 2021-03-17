const db = require("../models");
const Sede = db.sedes;
const Sequelize = require('sequelize');
const { param } = require("../routes");

// Create and Save a new Sede
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
        message: "Contenido no puede estar vacio!"
        });
        return;
    }
    
    // Create a Tutorial
    const sede = {
        nombre: req.body.nombre,
        localidad: req.body.localidad
    };
    
    // Save Tutorial in the database
    Sede.create(sede)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha habido algun error creando la sede."
        });
        });
};

// Retrieve all Sedes from the database.
exports.getAllSedes = (_, result) => {
    Sede.findAll()
    .then(data => {
      result.send(data);
    }).catch(err => {
      result.status(500).send({
        message: err.message || "Ha habido algun error descargando los datos."
      });
    });
};
