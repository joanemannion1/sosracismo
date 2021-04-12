const db = require("../models");
const Usuario = db.usuarios;
const Sequelize = require('sequelize');
const { param } = require("../routes");

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
    nacionalidad: req.body.data.nacionalidad,
    pais_origen: req.body.data.pais_origen,
    sedeId: req.body.data.sedeId,
    trabajadorId: req.body.data.trabajadorId,
  };

  console.log(usuario);
  // Save Tutorial in the database
  Usuario.create(usuario)
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

// Retrieve all Usuarios from the database.
exports.getAllUsuarios = (req, result) => {
  const email = req.params.email;
  Usuario.findAll({
    where: {
      trabajadorId: email
    },
    attributes: ['telefono', 'n_documentacion', 'nombre', 'apellido1', 'apellido2', 'telefono', 'email', 'nacionalidad', 'sedeId', 'genero', 'trabajadorId']
  })
    .then(data => {
      result.send(data);
    }).catch(error => {
      result.status(400).send(error)
    })
};

// Retrieve Usuario with n_documentacion from the database.
exports.getUsuarioWithDocumentacion = (req, result) => {
  const ndoc = req.params.ndoc;
  Usuario.findAll({
    where: {
      n_documentacion: ndoc
    },
    attributes: ['nombre', 'apellido1', 'apellido2', 'tipo_documentacion', 'n_documentacion','genero', 'sedeId', 'trabajadorId', 'email', 'telefono', 'direccion', 'cp', 'localidad', 'provincia', 'pais_origen', 'nacionalidad']
  })
    .then(data => {
      result.send(data);
    }).catch(error => {
      result.status(400).send(error)
    })
};

//Retrieve different nationalities
exports.getAllNationalities = (req, result) => {
  const email = req.params.email;
  Usuario.findAll({
    where: {
      trabajadorId: email
    },
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('nacionalidad')), 'nacionalidad']]
  })
    .then(data => {
      result.send(data);
    }).catch(error => {
      result.status(400).send(error)
    })
};

//Retrieve different sedes
exports.getAllSedes = (req, result) => {
  const email = req.params.email;
  Usuario.findAll({
    where: {
      trabajadorId: email
    },
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('sedeId')), 'sede']]
  })
    .then(data => {
      result.send(data);
    }).catch(error => {
      result.status(400).send(error)
    })
};

//Get number of users by nationalities for excel
exports.getCountUserByNationalities = (req, res) => {
  db.databaseConf.query("SELECT nacionalidad, SUM(CASE WHEN genero = 'h' THEN 1 END) AS hombre ,SUM(CASE WHEN genero = 'm' THEN 1 END) AS mujer FROM Usuario GROUP BY nacionalidad").then(results => {
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
    nacionalidad: req.body.data.nacionalidad,
    pais_origen: req.body.data.pais_origen,
    sedeId: req.body.data.sedeId,
    trabajadorId: req.body.data.trabajadorId,
  };

  Usuario.update(usuario, {
    where: { n_documentacion: id }
  })
    .then(num => {
      if (num == 1) {
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