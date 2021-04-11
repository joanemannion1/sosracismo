const db = require("../models");
const Intervencion = db.intervenciones;
const Documento = db.documentos;
const Sequelize = require('sequelize');
const { param } = require("../routes");

// Create and Save a new Intervencion
exports.create = (req, res) => {
    // Validate request
    if (!req.body.data) {
        res.status(400).send({
        message: "Contenido no puede estar vacio!"
        });
        return;
    }
    
    // Create a Intervencion
    const intervencion = {
        casoId: req.body.data.casoId,
        nombre: req.body.data.nombre,
        descripcion: req.body.data.descripcion,
    };

    
    // Save Intervencion in the database
    Intervencion.create(intervencion)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha habido algun error creando la intervención."
        });
        });
};

