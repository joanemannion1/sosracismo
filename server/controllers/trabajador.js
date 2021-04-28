const db = require("../models");
const Trabajador = db.trabajadores;
const Sequelize = require('sequelize');
const { param } = require("../routes");
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const trabajadorahogar = require("../models/trabajadorahogar");

// Create and Save a new Trabajador
exports.create = (req, res) => {
  // Validate request
  if (!req.body.data.email) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
    return;
  }

  const trabajador = {
    nombre: req.body.data.nombre,
    email: req.body.data.email,
    admin: req.body.data.admin ? 1 : 0,
    sedeId: req.body.data.sede,
    color: req.body.data.color,
  };
  // Create a Trabajador
  bcrypt.hash(req.body.data.contraseña, BCRYPT_SALT_ROUNDS)
    .then(hashedPassword => {
      trabajador['contraseña'] = hashedPassword
      Trabajador.create(trabajador)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha habido algun error creando el usuario."
        });
      });
    })


  // Save Trabajador in the database
 
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
    if (!data[0].email) {
      result.status(500).send({message: "Ese trabajador no existe"})
    } else {
      result.send(data);
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Ha habido algun error consiguiendo el trabajador con email : ${paramEmail}`
    });
  });
};

exports.updatePasswordByEmail = (request, result) => {
  Trabajador.findOne({
    where: {
      email: request.body.email,
    },
  }).then(trabajador => {
    console.log(trabajador)
    if (trabajador == null) {
      result.status(403).send('Trabajador no existe en la base de datos');
    } else if (trabajador != null) {
      var passwordIsValid = bcrypt.compareSync(
        request.body.contraseña_actual,
        trabajador.contraseña
      );

      if (!passwordIsValid) {
        return result.status(401).send({
          accessToken: null,
          message: "La contraseña actual es incorrecta"
        });
      }

      bcrypt
        .hash(request.body.contraseña, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
          trabajador.update({
            contraseña: hashedPassword,
          });
        })
        .then(() => {
          result.status(200).send({ message: 'contraseña actualizada' });
        });

    } else {
      result.status(401).json('no trabajador exists in db to update');
    }
  });
}


// Hacer Log In de un trabajador
exports.logIn = (request, result) => {
  Trabajador.findOne({
    where: {
      email: request.body.email,
    }
  }).then(user => {
    if (!user) {
      return result.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      request.body.contraseña,
      user.contraseña
    );

    if (!passwordIsValid) {
      return result.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ email: user.email, admin: user.admin }, config.secret, {
      expiresIn: 86400, //5minutu probazeko//86400 // 24 hours
    });

    result.json({ auth: true, accessToken: token, result: { nombre: user.nombre, sede: user.sede, admin: user.admin, email: user.email } })
    // result.status(200).send({
    //   nombre: user.nombre,
    //   sede: user.sedeId,
    //   admin: user.admin,
    //   accessToken: token
    // });
  }).catch(err => {
    result.status(500).send({ message: err.message });
  });
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
      result.status(500).send({
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

