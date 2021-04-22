const db = require("../models");
const Cita = db.citas;
const Cita_Usuario_Trabajador = db.usuario_cita_trabajador;
const Sequelize = require('sequelize');
const { param } = require("../routes");
const { usuario_cita_trabajador } = require("../models");

// Create and Save a new Cita
exports.create = (req, res) => {
    // Validate request
    if (!req.body.formData.fechaInicio) {
        res.status(400).send({
            message: "Contenido no puede estar vacio!"
        });
        return;
    }

    const cita = {
        fechaInicio: req.body.formData.fechaInicio,
        fechaFin: req.body.formData.fechaFin,
        nombre: req.body.formData.nombre,
        notas: req.body.formData.notas
    };


    Cita.create(cita)
        .then(data => {
            const uct = {
                id: data.id,
                trabajadorId: req.body.formData.trabajador,
                n_documentacion: req.body.formData.usuario
            }
            Cita_Usuario_Trabajador.create(uct).then(data => {
                res.send(data);
            })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Ha habido algun error creando la cita."
                    });
                });
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha habido algun error creando la cita."
            });
        });

};

// Coger todas las citas de la base de datos
exports.getAllCitas = (req, result) => {
    db.databaseConf.query("SELECT CUT.id,CUT.trabajadorId,CUT.n_documentacion,Cita.fechaInicio AS start, Cita.fechaFin AS end, Cita.nombre as title, Cita.notas, Trabajador.color FROM Cita_Usuario_Trabajador as CUT INNER JOIN Cita on CUT.id = Cita.id INNER JOIN Trabajador On CUT.trabajadorId = Trabajador.email").then(results => {
        result.send(results)
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha habido algun error obteniendo la cita."
      });
    });
};

// Delete a Trabajador with the specified id in the request
exports.deleteCita = (request, result) => {
    const citaId = request.params.id;
    Cita_Usuario_Trabajador.destroy({
        where: {
            id: citaId
        }
    }).then(num => {
            if (num === 1) {
                Cita.destroy({
                    where: { citaId: citaId }
                  }).then(num => {
                    if (num === 1) {
                      result.send({
                        message: "El trabajador ha sido eliminado correctamente."
                      });
                    } else {
                      result.send({
                        message: `No se ha podido eliminar la cita con id=${citaId}!`
                      });
                    }
                })
            } else {
              result.send({
                message: `No se ha podido eliminar la cita con id=${citaId}!`
              });
            }
    }).catch(err => {
      result.status(500).send({
        message: err.message || `Ha habido algun error eliminando la cita con id=${citaId}!`
      });
    });
  };