const db = require("../models");
const Caso = db.casos;
const Discriminacion = db.discriminaciones;
const Extranjeria = db.extranjerias;
const Interna = db.internas;
const Externa = db.externas;
const NecesidadExtranjeria = db.necesidadextranjeria
const TrabajadoraHogar = db.trabajadoras_hogar;
const Sequelize = require('sequelize');
const { param } = require("../routes");
const trabajadorahogar = require("../models/trabajadorahogar");
const usuario = require("../models/usuario");

// Create and Save a new Caso Discriminacion
exports.createDiscriminacion = (req, res) => {
  // Validate request
  // if (!req.body.formData.fechaInicio) {
  //     res.status(400).send({
  //         message: "Contenido no puede estar vacio!"
  //     });
  //     return;
  // }

  const caso = {
    n_documentacion: req.body.data.n_documentacion,
    trabajadorId: req.body.data.trabajadorId,
    finalizado: false
  };


  Caso.create(caso)
    .then(data => {
      const discriminacionVar = {
        id: data.id,
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
      console.log(discriminacionVar)
      Discriminacion.create(discriminacionVar).then(data => {
        res.send({message: " El caso ha sido añadido correctamente", caso: data.id})
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
    where:  { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Caso was updated successfully."
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

// Create and Save a new Caso Trabajadora Hogar
exports.createTrabajadoraHogar = (req, res) => {
  // Validate request
  // if (!req.body.formData.fechaInicio) {
  //     res.status(400).send({
  //         message: "Contenido no puede estar vacio!"
  //     });
  //     return;
  // }

  const caso = {
    n_documentacion: req.body.data.n_documentacion,
    trabajadorId: req.body.data.trabajadorId,
    finalizado: false
  };


  Caso.create(caso)
    .then(data => {
      const trabajadoraHogar = {
        id: data.id,
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
            id: data.id,
            permiso_salida: req.body.data.permiso_salida,
            descanso_semanal: req.body.data.descanso_semanal,
          };
          Interna.create(internaVar).then(data => {
            res.send({message: " El caso ha sido añadido correctamente", caso: data.id})
          }).catch(err => {
            res.status(500).send({
              message:
                err.message || "Ha habido algun error creando el caso."
            });
          });
        } else {
          const externa = {
            id: data.id
          }
          Externa.create(externa).then(data => {
            res.send({message: " El caso ha sido añadido correctamente", caso: data.id})
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
    where:  { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Caso was updated successfully."
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

// Create and Save a new Caso Extranjeria
exports.createExtranjeria = (req, res) => {

  const caso = {
    n_documentacion: req.body.data.n_documentacion,
    trabajadorId: req.body.data.trabajadorId,
    finalizado: false
  };


  Caso.create(caso)
    .then(data => {
      const extranjeriaVar = {
        id: data.id,
        proyectos: req.body.data.proyectos
      }
      Extranjeria.create(extranjeriaVar).then(data => {
        req.body.data.necesidad.map(necesidadVar => {
          NecesidadExtranjeria.create({
            id: data.id,
            necesidad: necesidadVar
          })
          
        })
        
      })
      res.send({message: " El caso ha sido añadido correctamente", caso: data.id})
  })
 

};

// Update and Save a Caso Extranjeria
exports.updateExtranjeria = (req, res) => {
  const id = req.params.id;

  const extranjeriaVar = {
    proyectos: req.body.data.proyectos
  }
  Extranjeria.update(extranjeriaVar, {
    where:  { id: id }
  }).then(num => {
    if (num == 1) {
      NecesidadExtranjeria.destroy({
        where: { id: id }
      })
      req.body.data.necesidad.map(necesidadVar => {
        console.log(necesidadVar)
        NecesidadExtranjeria.create({
          id: id,
          necesidad: necesidadVar
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
  Caso.findAll({
    where: {
      trabajadorId: email
    },
  })
    .then(data => {
      result.send(data);
    }).catch(error => {
      result.status(400).send(error)
    })
};


// Retrieve caso by id
exports.getCasoById = (req, result) => {
  const id = req.params.id;
  Caso.findAll({
    where: {
      id: id
    },
  })
    .then(data => {
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
      id: id
    },
  })
    .then(data => {
      result.send(data);
    }).catch(error => {
      result.status(400).send(error)
    })
};

exports.getCasoEspecificoTrabajadoraId = (req, result) => {
  const id = req.params.id;
  db.databaseConf.query("SELECT * FROM TrabajadoraHogar LEFT JOIN Interna On TrabajadoraHogar.id = Interna.id WHERE TrabajadoraHogar.id = " + id).then(results => {
    result.send(results[0])
  });
};

exports.getCasoEspecificoExtranjeriaId = (req, result) => {
  const id = req.params.id;
  db.databaseConf.query("SELECT * FROM Extranjeria WHERE Extranjeria.id = " + id).then(results => {
    result.send(results[0])
  });
};

// Retrieve all necesidades with Id
exports.getNecesidadExtranjeriaId = (req, result) => {
  const id = req.params.id;
  NecesidadExtranjeria.findAll({
    where: {
      id: id
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
  db.databaseConf.query("SELECT id,tablename FROM (SELECT id, 'Extranjeria' AS tablename FROM Extranjeria WHERE id = " + id + " UNION ALL SELECT id, 'TrabajadoraHogar' as tablename From TrabajadoraHogar WHERE id = " + id + " UNION ALL Select id, 'Discriminacion' as tablename FROM Discriminacion WHERE id = " + id + ") AS X").then(results => {
    result.send(results[0])
  });
}

// Retrieve all necesidades with Id
exports.finalizarCaso = (req, result) => {
  const id = req.params.id;
  Caso.update(
    { finalizado: '1' },
    { where: { id: id } }
  )
    .then(result =>
      result.send(result)
    )
    .catch(err =>
      result.send(err)
    )
};

// Retrieve all casos from database 
exports.getAllCasosNoFinalizados = (req, result) => {
  const email = req.params.email;
  db.databaseConf.query("SELECT Caso.*, Usuario.nombre AS nombre, Usuario.apellido1 , Usuario.apellido2 FROM Caso Left Join Usuario on Caso.n_documentacion = Usuario.n_documentacion WHERE Caso.finalizado = 0 AND Caso.trabajadorId = '" + email + "'").then(results => {
    result.send(results[0])
    }).catch(error => {
      result.status(400).send(error)
    })
};

//Delete caso by Id
exports.deleteById = (req, result) => {
  var id = req.params.id;
  Interna.destroy({
    where: { id: id }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Ha habido algun error eliminando el caso con id=${id}!`
    });
  });
  
  Externa.destroy({
    where: { id: id }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Ha habido algun error eliminando el caso con id=${id}!`
    });
  });
  
  TrabajadoraHogar.destroy({
    where: { id: id }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Ha habido algun error eliminando el caso con id=${id}!`
    });
  });

  Discriminacion.destroy({
    where: { id: id }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Ha habido algun error eliminando el caso con id=${id}!`
    });
  });
  NecesidadExtranjeria.destroy({
    where: { id: id }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Ha habido algun error eliminando el caso con id=${id}!`
    });
  });
  Extranjeria.destroy({
    where: { id: id }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Ha habido algun error eliminando el caso con id=${id}!`
    });
  });
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
  });
}
