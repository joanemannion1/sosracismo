const db = require("../models");
const Trabajador = db.trabajadores;
const Sequelize = require('sequelize');
const { param } = require("../routes");
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;

// Create and Save a new Trabajador
exports.create = (req, res) => {
    // Validate request
    if (!req.body.data) {
        res.status(400).send({
        message: "Contenido no puede estar vacio!"
        });
        return;
    }
    // Create a Trabajador
    const trabajador = {
        nombre: req.body.data.nombre,
        email: req.body.data.email,
        contraseña: req.body.data.contraseña,
        admin: req.body.data.admin ? 1 : 0,
        sedeId: req.body.data.sede,
        color: req.body.data.color,
    };
    
    // Save Trabajador in the database
    Trabajador.create(trabajador)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha habido algun error creando el usuario."
        });
        });
};

// Retrieve all Trabajadores from the database.
exports.getAllTrabajadores = (_, result) => {
    Trabajador.findAll()
    .then(data => {
      result.send(data);
    }).catch(err => {
      result.status(500).send({
        message: err.message || "Ha habido algun error descargando los datos."
      });
    });
};

// Find a single Trabajador with an id
exports.getTrabajadorByEmail = (request, result) => {
    const paramEmail = request.params.email;
    Trabajador.findAll({
      where: { email: paramEmail }
    }).then(data => {
      result.send(data);
    }).catch(err => {
      result.status(500).send({
        message: err.message || `Ha habido algun error consiguiendo el trabajador con email : ${paramEmail}`
      });
    });
  };

exports.updatePasswordByEmail = (request, result) =>  {
  Trabajador.findOne({
    where: {
      email: request.body.email,
      contraseña: request.body.contraseña_actual,
    },
  }).then(trabajador => {
    if (trabajador == null) {
      console.error('trabajador no existe en la base de datos');
      result.status(403).send('trabajador no existe en la base de datos');
    } else if (trabajador != null) {
        bcrypt
          .hash(request.body.contraseña, BCRYPT_SALT_ROUNDS)
          .then(hashedPassword => {
            trabajador.update({
              contraseña: hashedPassword,
            });
          })
          .then(() => {
            console.log('contraseña actualizada');
            result.status(200).send({ message: 'contraseña actualizada' });
          });
        
    } else {
      console.error('no trabajador exists in db to update');
      result.status(401).json('no trabajador exists in db to update');
    }
  });
} 


// Hacer Log In de un trabajador
exports.logIn = (request, result) => {
  
}
// Delete a Trabajador with the specified id in the request
exports.deleteTrabajadorByEmail = (request, result) => {
    const paramEmail = request.params.email;
    Trabajador.destroy({
      where: { email: paramEmail }
    }).then(num => {
      if (num === 1) {
        result.send({
          message: "El trabajador ha sido eliminado correctamente."
        });
      } else {
        result.send({
          message: `No se ha podido eliminar trabajador con email=${paramEmail}!`
        });
      }
    }).catch(err => {
      result.status(500).send({
        message: err.message || `Ha habido algun error eliminando trabajador con email=${paramEmail}!`
      });
    });
  };

// Delete all Trabajadores from the database.
exports.deleteAllTrabajadores = (request, result) => {
    Trabajador.destroy({
      where: {},
      truncate: false
    }).then(nums => {
      result.send({
        message: `${nums} trabajadores han sido eliminados correctamente!`
      });
    }).catch(err => {
      result.status(500).send({
        message: err.message || "Ha habido algun error, no se han podido eliminar trabajadores}!"
      });
    });
  };
  
