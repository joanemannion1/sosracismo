const db = require("../models");
const Usuario = db.usuarios;
const Nacionalidad = db.nacionalidades;
const Sequelize = require('sequelize');
const { param } = require("../routes");
const jwt = require('jsonwebtoken')
const config = require("../config/auth.config.js");

// Create and Save a new Usuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body.data.n_documentacion) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
    return;
  }

  // Create a User
  const usuario = {
    tipo_documentacion: req.body.data.tipo_documentacion,
    n_documentacion: req.body.data.n_documentacion,
    nombre: req.body.data.nombre,
    apellido1: req.body.data.apellido1,
    apellido2: req.body.data.apellido2,
    genero: req.body.data.genero,
    email: req.body.data.email,
    telefono: req.body.data.telefono ? req.body.data.telefono : null,
    direccion: req.body.data.direccion,
    localidad: req.body.data.localidad,
    cp: req.body.data.cp ? req.body.data.cp : null,
    provincia: req.body.data.provincia,
    pais_origen: req.body.data.pais_origen,
    sedeId: req.body.data.sedeId,
    trabajadorId: req.body.data.trabajadorId,
  };
  // Save Tutorial in the database
  Usuario.create(usuario)
    .then(data => {
      req.body.data.nacionalidad.map(nacionalidad => {
        console.log(nacionalidad)
        Nacionalidad.create({ nacionalidad: nacionalidad.value, n_documentacion: data.n_documentacion })
      })
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha habido algun error creando el usuario."
      });
    });
};

// Retrieve all Usuarios from the database.
exports.getAllUsuarios = (req, result) => {
  const email = req.params.email;
  jwt.verify(email, config.secret, (err, decoded) => {
    if (err) {
      result.status(400).send({ auth: false, message: "No se ha podido autenticar usuario" });
    } else {
      db.databaseConf.query("SELECT Usuario.*, Nacionalidad.nacionalidad FROM Usuario LEFT OUTER JOIN Nacionalidad on Usuario.n_documentacion = Nacionalidad.n_documentacion WHERE Usuario.trabajadorId = '" + decoded.email + "'").then(results => {
        result.send(results[0])
      }).catch(error => {
        result.status(400).send(error)
      })
    }
  })
};

// Retrieve Usuario with n_documentacion from the database.
exports.getUsuarioWithDocumentacion = (req, result) => {
  const ndoc = req.params.ndoc;
  db.databaseConf.query("SELECT Usuario.*, Nacionalidad.nacionalidad FROM Usuario LEFT OUTER JOIN Nacionalidad on Usuario.n_documentacion = Nacionalidad.n_documentacion WHERE Usuario.n_documentacion = '" + ndoc + "'").then(results => {
    result.send(results[0])
  }).catch(error => {
    result.status(400).send(error)
  })
};

//Retrieve different nationalities
exports.getAllNationalities = (req, result) => {
  const email = req.params.email;
  jwt.verify(email, config.secret, (err, decoded) => {
    if (err) {
      result.status(400).send({ auth: false, message: "No se ha podido autenticar usuario" });
    } else {
      db.databaseConf.query("SELECT DISTINCT Nacionalidad.nacionalidad FROM Usuario LEFT OUTER JOIN Nacionalidad on Usuario.n_documentacion = Nacionalidad.n_documentacion WHERE Nacionalidad.nacionalidad IS NOT NULL AND Usuario.trabajadorId = '" + decoded.email + "'").then(results => {
        result.send(results[0])
      }).catch(error => {
        result.status(400).send(error)
      })
    }
  })

};

//Retrieve different sedes
exports.getAllSedes = (req, result) => {
  const email = req.params.email;
  jwt.verify(email, config.secret, (err, decoded) => {
    if (err) {
      result.status(400).send({ auth: false, message: "No se ha podido autenticar usuario" });
    } else {
      Usuario.findAll({
        where: {
          trabajadorId: decoded.email
        },
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('sedeId')), 'sede']]
      })
        .then(data => {
          result.send(data);
        }).catch(error => {
          result.status(400).send(error)
        })
    }
  })

};

//Get number of users by nationalities for excel
exports.getCountUserByNationalities = (req, res) => {
  db.databaseConf.query("SELECT Nacionalidad.nacionalidad, SUM(CASE WHEN Usuario.genero = 'h' THEN 1 END) AS hombre ,SUM(CASE WHEN Usuario.genero = 'm' THEN 1 END) AS mujer FROM Usuario LEFT OUTER JOIN Nacionalidad ON Usuario.n_documentacion = Nacionalidad.n_documentacion WHERE Nacionalidad.nacionalidad IS NOT NULL GROUP BY Nacionalidad.nacionalidad").then(results => {
    res.send(results[0])
  });
}

//Get number of users by necesidades for excel
exports.getCountUserByNecesidad = (req, res) => {
  db.databaseConf.query("SELECT NecesidadExtranjeria.necesidad, SUM(CASE WHEN Usuario.genero = 'h' THEN 1 END) AS hombre ,SUM(CASE WHEN Usuario.genero = 'm' THEN 1 END) AS mujer FROM NecesidadExtranjeria LEFT OUTER JOIN Caso on NecesidadExtranjeria.id = Caso.id Left Outer Join Usuario ON Caso.n_documentacion = Usuario.n_documentacion GROUP BY NecesidadExtranjeria.necesidad").then(results => {
    res.send(results[0])
  });
}



exports.update = (req, res) => {
  const id = req.params.id;

  const usuario = {
    tipo_documentacion: req.body.data.tipo_documentacion,
    n_documentacion: req.body.data.n_documentacion,
    nombre: req.body.data.nombre,
    apellido1: req.body.data.apellido1,
    apellido2: req.body.data.apellido2,
    genero: req.body.data.genero,
    email: req.body.data.email,
    telefono: req.body.data.telefono ? req.body.data.telefono : null,
    direccion: req.body.data.direccion,
    localidad: req.body.data.localidad,
    cp: req.body.data.cp ? req.body.data.cp : null,
    provincia: req.body.data.provincia,
    pais_origen: req.body.data.pais_origen,
    sedeId: req.body.data.sedeId,
    trabajadorId: req.body.data.trabajadorId,
  };

  Usuario.update(usuario, {
    where: { n_documentacion: id }
  })
    .then(num => {
      if (num == 1) {
        Nacionalidad.destroy({
          where: {
            n_documentacion: id
          }
        })
        req.body.data.nacionalidad.map(nacionalidad => {
          Nacionalidad.create({ nacionalidad: nacionalidad.value, n_documentacion: id })
        })
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.deleteByNDoc = (req, res) => {
  var ndoc = req.params.ndoc;

  Usuario.destroy({
    where: {
      n_documentacion: id
    }
  }).then(num => {
    if (num === 1) {
      result.send({
        message: "El usuario ha sido eliminado correctamente."
      });
    } else {
      result.send({
        message: `No se ha podido eliminar el usuario con id=${ndoc}!`
      });
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Ha habido algun error eliminando el usuario con id=${ndoc}!`
    });
  });
}

exports.checkTelefono = (req, res) => {
  const tfn = req.params.telefono;
  Usuario.findAll({
    where: {
      telefono: tfn
    },
    attributes: ['nombre', 'apellido1', 'apellido2', 'genero', 'email', 'pais_origen']
  })
    .then(data => {
      if (data.length > 0) {
        res.send({ userExists: true });
      }
      else {
        res.send({ userExists: false });
      }

    }).catch(error => {
      res.status(400).send(error)
    })
}