const db = require("../models");
const Trabajador = db.trabajadores;
const TrabajadorSede = db.trabajador_sedes;
const Sequelize = require('sequelize');
const { param } = require("../routes");
const bcrypt = require('bcryptjs');
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
    color: req.body.data.color,
  };
  // Create a Trabajador
  bcrypt.hash(req.body.data.contraseña, BCRYPT_SALT_ROUNDS)
    .then(hashedPassword => {
      trabajador['contraseña'] = hashedPassword
      Trabajador.create(trabajador)
        .then(data => {
          req.body.data.sede.map(sede => {
            TrabajadorSede.create({
              sedeId: sede.sedeId,
              trabajadorId: req.body.data.email
            })
          })
          res.status(200).send(data);
        })
        .catch(err => {
          console.log(err.message)
          res.status(500).send({
            message:
              err.message || "Ha habido algun error creando el usuario."
          });
        });
    })


};

exports.update = (req, res) => {
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
    color: req.body.data.color,
  };
  // Update a Trabajador
  Trabajador.update(trabajador, {
    where: { email: trabajador.email }
  }).then(num => {
    if (num[0] === 1) {
      TrabajadorSede.destroy({
        where: {
          trabajadorId: trabajador.email
        }
      })
      req.body.data.sede.map(sede => {
        TrabajadorSede.create({
          sedeId: sede.sedeId,
          trabajadorId: req.body.data.email
        })
      })
      res.status(200).send(trabajador);
    } else {
      res.status(500).send({
        message: `Cannot update Trabajador with email=${trabajador.email}. Maybe Trabajador was not found or req.body is empty!`
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha habido algun error actualizando el trabajador."
      });
    });
}

// Retrieve all Trabajadores from the database.
exports.getAllTrabajadores = (_, result) => {
  Trabajador.findAll({ include: TrabajadorSede })
    .then(data => {
      console.log(data)
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
  db.databaseConf.query("SELECT Trabajador.*, Trabajador_sede.sedeId FROM Trabajador LEFT OUTER JOIN Trabajador_sede on Trabajador.email = Trabajador_sede.trabajadorId WHERE Trabajador.email = '" + paramEmail + "'").then(results => {
    if (!(results[0][0])) {
      result.status(500).send({ message: "Ese trabajador no existe" })
    } else {
      result.send(results[0])
    }
  }).catch(errorr => {
    result.status(500).send({
      message: errorr.message || `Ha habido algun error consiguiendo el trabajador con email : ${paramEmail}`
    });
  })
};

exports.updatePasswordByEmail = (request, result) => {
  Trabajador.findOne({
    where: {
      email: request.body.email,
    },
  }).then(trabajador => {
    if (trabajador == null) {
      result.status(403).send({ message: 'Trabajador no existe en la base de datos' });
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
      expiresIn: 86400, //5minutu probazeko //86400 // 24 hours
    });

    result.json({ auth: true, token: token, nombre: user.nombre, sede: user.sede, admin: user.admin, email: user.email })
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
      result.status(200).send({
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

// // Delete all Trabajadores from the database.
// exports.deleteAllTrabajadores = (request, result) => {
//   Trabajador.destroy({
//     where: {},
//     truncate: false
//   }).then(nums => {
//     result.send({
//       message: `${nums} trabajadores han sido eliminados correctamente!`
//     });
//   }).catch(err => {
//     result.status(500).send({
//       message: err.message || "Ha habido algun error, no se han podido eliminar trabajadores}!"
//     });
//   });
// };

