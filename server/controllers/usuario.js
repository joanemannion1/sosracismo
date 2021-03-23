const db = require("../models");
const Usuario = db.usuarios;
const Sequelize = require('sequelize');
const { param } = require("../routes");
const { trabajadores } = require("../models");

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
        trabajadorId : email
      },
      attributes: ['telefono', 'n_documentacion', 'nombre', 'apellido1', 'apellido2', 'telefono', 'email', 'nacionalidad', 'sedeId', 'genero', 'trabajadorId']
  })
    .then(data => {
      result.send(data);
    }).catch( error => {
      result.status( 400 ).send( error )
    })
};

// Retrieve Usuario with n_documentacion from the database.
exports.getUsuarioWithDocumentacion = (request, result) => {
    Usuario.findOne({ where: {n_documentacion : request.body.email}})
    .then(data => {
      result.send(data);
    }).catch(err => {
      result.status(500).send({
        message: err.message || "Ha habido algun error encontrando al usuario."
      });
    });
};

//Retrieve different nationalities
exports.getAllNationalities = (req, result) => {
  const email = req.params.email;
  Usuario.findAll({ where: {
    trabajadorId : email
  },
  attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('nacionalidad')) ,'nacionalidad']]})
  .then(data => {
    console.log(data);
    result.send(data);
  }).catch( error => {
    result.status( 400 ).send( error )
  })
};