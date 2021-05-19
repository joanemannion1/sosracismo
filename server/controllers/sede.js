const db = require("../models");
const Sede = db.sedes;
const Sequelize = require('sequelize');
const { param } = require("../routes");

// Create and Save a new Sede
exports.create = (req, res) => {
    // Validate request
    if (!req.body.data.nombre) {
        res.status(400).send({
        message: "Contenido no puede estar vacio!"
        });
        return;
    }
    
    // Create a Sede
    const sede = {
        nombre: req.body.data.nombre,
        localidad: req.body.data.localidad
    };
    
    // Save Sede in the database
    Sede.create(sede)
        .then(data => {
        res.status(200).send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha habido algun error creando la sede."
        });
        });
};

exports.update = (req, res) => {
  var id = req.params.id;
  // Create a Sede
  const sede = {
      nombre: req.body.data.nombre,
      localidad: req.body.data.localidad
  };
  
  // Save Sede in the database
  Sede.update(sede, {
    where: { sedeId: id }
  })
  .then(num => {
    if(num[0] === 1) {
      res.send({message:'La sede se ha eliminado correctamente'});
    } else {
      res.status(500).send({
        message: err.message || "Ha habido algun error eliminando la sede."
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Ha habido algun error descargando los datos."
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

// Retrieve Sede by ID
exports.getSedeById = (req, result) => {
  var id = req.params.id;
  Sede.findByPk(id)
  .then(data => {
    if(data === null) {
      result.status(500).send({
        message: err.message || "Ha habido algun error descargando los datos."
      });
    }
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Ha habido algun error descargando los datos."
    });
  });
};

// Delete Sede by ID.
exports.deleteSedeById = (req, result) => {
  var id = req.params.id;
  Sede.destroy({
    where: {
        sedeId : id
    }
}).then(num => {
    if(num === 0) {
      result.status(500).send({
        message: err.message || "Ha habido algun error eliminando la sede."
      });
    }
    result.send({message:'La sede se ha eliminado correctamente'});
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Ha habido algun error descargando los datos."
    });
  });
}
