const db = require("../models");
const Caso = db.casos;
const Discriminacion = db.discriminaciones;
const Extranjeria = db.extranjerias;
const Interna = db.internas;
const Externa = db.externas;
const NecesidadExtranjeria = db.necesidadextranjeria
const ProyectoExtranjeria = db.proyectoextranjeria
const TrabajadoraHogar = db.trabajadoras_hogar;
const Sequelize = require('sequelize');
const { param } = require("../routes");
const jwt = require('jsonwebtoken')
const config = require("../config/auth.config.js");

// Create and Save a new Caso Discriminacion
exports.createDiscriminacion = (req, res) => {
  // Validate request
  if (!req.body.data.n_documentacion) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
    return;
  }

  const caso = {
    n_documentacion: req.body.data.n_documentacion,
    trabajadorId: req.body.data.trabajadorId,
    finalizado: false
  };


  Caso.create(caso)
    .then(data => {
      const discriminacionVar = {
        casoId: data.id,
        Situacion_documental: req.body.data.Situacion_documental,
        situacion_residencial: req.body.data.situacion_residencial,
        estudios: req.body.data.estudios,
        rasgos_fenotipicos: req.body.data.rasgos_fenotipicos,
        tipo: req.body.data.tipo,
        conflicto: req.body.data.conflicto,
        denegacion_privada: req.body.data.denegacion_privada ? req.body.data.denegacion_privada : '',
        denegacion_publica: req.body.data.denegacion_publica,
        racismo: req.body.data.racismo,
        agente_discriminador: req.body.data.agente_discriminador,
        fecha: Date(req.body.data.fecha),
        relato_hechos: req.body.data.relato_hechos,
        municipio: req.body.data.municipio,
        identificacion: req.body.data.identificacion,
        testigos: req.body.data.testigos,
        otros: req.body.data.otros,
        estrategia: req.body.data.estrategia,
        asumir: req.body.data.asumir,
        derivar: req.body.data.derivar
      }
      Discriminacion.create(discriminacionVar).then(data => {
        res.send({ message: " El caso ha sido añadido correctamente", caso: data.casoId })
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha habido algun error creando el caso."
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha habido algun error creando el caso."
      });
    });

};

// Update and Save a Caso Discriminacion
exports.updateDiscriminacion = (req, res) => {
  // Validate request
  if (!req.params.id) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
    return;
  }

  const id = req.params.id;
  const discriminacionVar = {
    Situacion_documental: req.body.data.Situacion_documental,
    situacion_residencial: req.body.data.situacion_residencial,
    estudios: req.body.data.estudios,
    rasgos_fenotipicos: req.body.data.rasgos_fenotipicos,
    tipo: req.body.data.tipo,
    conflicto: req.body.data.conflicto,
    denegacion_privada: req.body.data.denegacion_privada ? req.body.data.denegacion_privada : '',
    denegacion_publica: req.body.data.denegacion_publica,
    racismo: req.body.data.racismo,
    agente_discriminador: req.body.data.agente_discriminador,
    fecha: Date(req.body.data.fecha),
    relato_hechos: req.body.data.relato_hechos,
    municipio: req.body.data.municipio,
    identificacion: req.body.data.identificacion,
    testigos: req.body.data.testigos,
    otros: req.body.data.otros,
    estrategia: req.body.data.estrategia,
    asumir: req.body.data.asumir,
    derivar: req.body.data.derivar
  }

  Discriminacion.update(discriminacionVar, {
    where: { casoId: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "El caso ha sido actualizado correctamente."
      });
    } else {
      res.status(500).send({
        message: `Cannot update Caso with id=${id}. Maybe User was not found or req.body is empty!`
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Caso with id=" + id
      });
    });

};

// Create and Save a new Caso Trabajadora Hogar
exports.createTrabajadoraHogar = (req, res) => {
  // Validate request
  if (!req.body.data.n_documentacion) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
    return;
  }

  const caso = {
    n_documentacion: req.body.data.n_documentacion,
    trabajadorId: req.body.data.trabajadorId,
    finalizado: false
  };


  Caso.create(caso)
    .then(data => {
      id = data.dataValues.id
      const trabajadoraHogar = {
        casoId: id,
        motivo: req.body.data.motivo,
        n_casas: parseInt(req.body.data.n_casas),
        regularizada: req.body.data.regularizada === 'true' ? true : false,
        fecha_inicio: Date(req.body.data.fecha_inicio),
        fecha_final: Date(req.body.data.fecha_final),
        fecha_despido: Date(req.body.data.fecha_despido),
        forma_empleo: req.body.data.forma_empleo,
        contratador: req.body.data.contratador,
        horario_base: req.body.data.horario_base,
        solo_fines_semana: req.body.data.solo_fines_semana === 'true' ? true : false,
        horas_totales: parseInt(req.body.data.horas_totales),
        libra_festivos: req.body.data.libra_festivos,
        no_libra_pero_cobra: req.body.data.no_libra_pero_cobra,
        salario_festivos: parseFloat(req.body.data.salario_festivos),
        salario: parseFloat(req.body.data.salario),
        pagas: parseFloat(req.body.data.pagas),
        forma_pago: req.body.data.forma_pago,
        contrato: req.body.data.contrato === 'true' ? true : false,
        nomina: req.body.data.nomina === 'true' ? true : false,
        seguridad_social: req.body.data.seguridad_social === 'true' ? true : false,
        vacaciones: req.body.data.vacaciones,
        tipo_trabajo: req.body.data.tipo_trabajo,
        mayores: parseInt(req.body.data.mayores),
        genero_mayores: req.body.data.genero_mayores,
        enfermos: parseInt(req.body.data.enfermos),
        genero_enfermos: req.body.data.genero_enfermos,
        viven_solos: req.body.data.viven_solos === 'true' ? true : false
      }
      TrabajadoraHogar.create(trabajadoraHogar).then(data => {
        if (req.body.data.permiso_salida) {
          const internaVar = {
            casoId: id,
            permiso_salida: req.body.data.permiso_salida,
            descanso_semanal: req.body.data.descanso_semanal,
          };
          Interna.create(internaVar).then(data => {
            res.status(200).send({ message: " El caso ha sido añadido correctamente", caso: id })
          }).catch(err => {
            res.status(500).send({
              message:
                err.message || "Ha habido algun error creando el caso."
            });
          });
        } else {
          const externa = {
            casoId: id
          }
          Externa.create(externa).then(data => {
            res.status(200).send({ message: " El caso ha sido añadido correctamente", caso: id })
          }).catch(err => {
            res.status(500).send({
              message:
                err.message || "Ha habido algun error creando el caso."
            });
          });
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha habido algun error creando la el caso."
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha habido algun error creando el caso."
      });
    });

};

// Update and Save a Caso Trabajadora Hogar
exports.updateTrabajadoraHogar = (req, res) => {
  const id = req.params.id;

  const trabajadoraHogar = {
    motivo: req.body.data.motivo,
    n_casas: parseInt(req.body.data.n_casas),
    regularizada: req.body.data.regularizada === 'true' ? true : false,
    fecha_inicio: Date(req.body.data.fecha_inicio),
    fecha_final: Date(req.body.data.fecha_final),
    fecha_despido: Date(req.body.data.fecha_despido),
    forma_empleo: req.body.data.forma_empleo,
    contratador: req.body.data.contratador,
    horario_base: req.body.data.horario_base,
    solo_fines_semana: req.body.data.solo_fines_semana === 'true' ? true : false,
    horas_totales: parseInt(req.body.data.horas_totales),
    libra_festivos: req.body.data.libra_festivos,
    no_libra_pero_cobra: req.body.data.no_libra_pero_cobra,
    salario_festivos: parseFloat(req.body.data.salario_festivos),
    salario: parseFloat(req.body.data.salario),
    pagas: parseFloat(req.body.data.pagas),
    forma_pago: req.body.data.forma_pago,
    contrato: req.body.data.contrato === 'true' ? true : false,
    nomina: req.body.data.nomina === 'true' ? true : false,
    seguridad_social: req.body.data.seguridad_social === 'true' ? true : false,
    vacaciones: req.body.data.vacaciones,
    tipo_trabajo: req.body.data.tipo_trabajo,
    mayores: parseInt(req.body.data.mayores),
    genero_mayores: req.body.data.genero_mayores,
    enfermos: parseInt(req.body.data.enfermos),
    genero_enfermos: req.body.data.genero_enfermos,
    viven_solos: req.body.data.viven_solos === 'true' ? true : false
  }

  TrabajadoraHogar.update(trabajadoraHogar, {
    where: { casoId: id }
  }).then(num => {
    console.log(num)
    if (num == 1) {
      res.send({
        message: "El caso ha sido actualizado correctamente."
      });
    } else {
      res.send({
        message: `Cannot update Caso with id=${id}. Maybe User was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating Caso with id=" + id
    });
  });

};

// Create and Save a new Caso Extranjeria
exports.createExtranjeria = (req, res) => {
  // Validate request
  if (!req.body.data.n_documentacion) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
    return;
  }
  const caso = {
    n_documentacion: req.body.data.n_documentacion,
    trabajadorId: req.body.data.trabajadorId,
    finalizado: false
  };


  Caso.create(caso)
    .then(data => {
      id = data.id
      const extranjeriaVar = {
        casoId: data.id,
      }
      Extranjeria.create(extranjeriaVar).then(data => {
        req.body.data.necesidad.map(necesidadVar => {
          NecesidadExtranjeria.create({
            casoId: id,
            necesidad: necesidadVar
          })

        })
        req.body.data.proyectos.map(proyectoVar => {
          ProyectoExtranjeria.create({
            casoId: id,
            proyecto: proyectoVar
          })

        })

      })
      res.send({ message: " El caso ha sido añadido correctamente", caso: data.id })
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha habido algun error creando el caso."
      });
    });
};

// Update and Save a Caso Extranjeria
exports.updateExtranjeria = (req, res) => {
  const id = req.params.id;

  const extranjeriaVar = {
    updatedAt: new Date()
  }
  Extranjeria.update(extranjeriaVar, {
    where: { casoId: id }
  }).then(num => {
    if (num == 1) {
      NecesidadExtranjeria.destroy({
        where: { casoId: id }
      })
      req.body.data.necesidad.map(necesidadVar => {
        NecesidadExtranjeria.create({
          casoId: id,
          necesidad: necesidadVar
        })
      })
      ProyectoExtranjeria.destroy({
        where: { casoId: id }
      })
      req.body.data.proyectos.map(proyectoVar => {
        ProyectoExtranjeria.create({
          casoId: id,
          proyecto: proyectoVar
        })
      })
      res.send({
        message: "Caso was updated successfully."
      })
        .catch(err => {
          res.status(500).send({
            message: "Could not delte Necesidad with id=" + id
          });
        });
    } else {
      res.send({
        message: `Cannot update Caso with id=${id}. Maybe User was not found or req.body is empty!`
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Caso with id=" + id
      });
    });

};

// Retrieve all casos from database 
exports.getAllCasos = (req, result) => {
  const email = req.params.email;
  jwt.verify(email, config.secret, (err, decoded) => {
    if (err) {
      result.status(400).send({ auth: false, message: "No se ha podido autenticar usuario" });
    } else {
      Caso.findAll({
        where: {
          trabajadorId: decoded.email
        },
      })
        .then(data => {
          result.send(data);
        }).catch(error => {
          result.status(400).send(error)
        })
    }
  })

};


// Retrieve caso by id
exports.getCasoById = (req, result) => {
  const id = req.params.id;
  Caso.findAll({
    where: {
      id: id
    },
  }).then(data => {
    result.send(data);
  }).catch(error => {
    result.status(400).send(error)
  })
};

// Retrieve caso by id
exports.getCasoEspecificoDiscriminacionId = (req, result) => {
  const id = req.params.id;
  Discriminacion.findAll({
    where: {
      casoId: id
    },
  }).then(data => {
    result.send(data);
  }).catch(error => {
    result.status(400).send(error)
  })
};

exports.getCasoEspecificoTrabajadoraId = (req, result) => {
  const id = req.params.id;
  db.databaseConf.query("SELECT * FROM TrabajadoraHogar LEFT JOIN Interna On TrabajadoraHogar.casoId = Interna.casoId WHERE TrabajadoraHogar.casoId = " + id).then(results => {
    result.send(results[0])
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ha habido algun error obteniendo el caso."
    });
  });
};

exports.getCasoEspecificoExtranjeriaId = (req, result) => {
  const id = req.params.id;
  db.databaseConf.query("SELECT * FROM Extranjeria WHERE Extranjeria.casoId = " + id).then(results => {
    result.send(results[0])
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ha habido algun error obteniendo el caso."
    });
  });
};

// Retrieve all necesidades with Id
exports.getNecesidadExtranjeriaId = (req, result) => {
  const id = req.params.id;
  NecesidadExtranjeria.findAll({
    where: {
      casoId: id
    },
  })
    .then(data => {
      result.send(data);
    }).catch(error => {
      result.status(400).send(error)
    })
};

// Retrieve all proyectos with Id
exports.getProyectoExtranjeriaId = (req, result) => {
  const id = req.params.id;
  ProyectoExtranjeria.findAll({
    where: {
      casoId: id
    },
  })
    .then(data => {
      result.send(data);
    }).catch(error => {
      result.status(400).send(error)
    })
};

//Retrieve tablename of a Caso
exports.getCasoType = (req, result) => {
  const id = req.params.id;
  db.databaseConf.query("SELECT casoId,tablename FROM (SELECT casoId, 'Extranjeria' AS tablename FROM Extranjeria WHERE casoId = " + id + " UNION ALL SELECT casoId, 'TrabajadoraHogar' as tablename From TrabajadoraHogar WHERE casoId = " + id + " UNION ALL Select casoId, 'Discriminacion' as tablename FROM Discriminacion WHERE casoId = " + id + ") AS X").then(results => {
    result.send(results[0])
  }).catch(err => {
    result.status(500).send({
      message:
        err.message || "Ha habido algun error creando el caso."
    });
  });
}

// Retrieve all necesidades with Id
exports.finalizarCaso = (req, res) => {
  const id = req.params.id;
  Caso.update(
    { finalizado: '1' },
    { where: { id: id } }
  ).then(result => {
    res.status(200).send({ message: "El caso ha sido finalizado correctamente" })
  }).catch(err =>
    res.status(500).send({ message: "Ha habido algun error, no se ha podido finalizar el caso" })
  )
};

// Retrieve all casos from database 
exports.getAllCasosNoFinalizados = (req, result) => {
  const email = req.params.email;
  jwt.verify(email, config.secret, (err, decoded) => {
    if (err) {
      result.status(400).send({ auth: false, message: "No se ha podido autenticar usuario" });
    } else {
      db.databaseConf.query("SELECT Caso.*, Usuario.nombre AS nombre, Usuario.apellido1 , Usuario.apellido2 FROM Caso Left Join Usuario on Caso.n_documentacion = Usuario.n_documentacion WHERE Caso.finalizado = 0 AND Caso.trabajadorId = '" + decoded.email + "'").then(results => {
        result.send(results[0])
      }).catch(error => {
        result.status(400).send(error)
      })
    }
  })

};

//Delete caso by Id
exports.deleteById = (req, result) => {
  var id = req.params.id;
  Caso.destroy({
    where: {
      id: id
    }
  }).then(num => {
    if (num === 1) {
      result.send({
        message: "El caso ha sido eliminado correctamente."
      });
    } else {
      result.send({
        message: `No se ha podido eliminar el caso con id=${id}!`
      });
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Ha habido algun error eliminando el caso con id=${id}!`
    });
  });
}

exports.getNecesidadWithUser = (req, res) => {
  start = req.body.startDate
  end = req.body.endDate
  db.databaseConf.query("SELECT NecesidadExtranjeria.necesidad, SUM(CASE WHEN Usuario.genero = 'h' THEN 1 END) AS hombre ,SUM(CASE WHEN Usuario.genero = 'm' THEN 1 END) AS mujer FROM NecesidadExtranjeria LEFT OUTER JOIN Caso on NecesidadExtranjeria.id = Caso.id Left Outer Join Usuario ON Caso.n_documentacion = Usuario.n_documentacion  WHERE NecesidadExtranjeria.updatedAt <= '" + end + "' AND NecesidadExtranjeria.updatedAt >= '" + start + "' GROUP BY NecesidadExtranjeria.necesidad").then(results => {
    res.send(results[0])
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ha habido algun error descargando la necesidad."
    });
  });
}
