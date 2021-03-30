const db = require("../models");
const Caso = db.casos;
const Discriminacion = db.discriminaciones;
const TrabajadoraHogar = db.trabajadoras_hogar;
const Sequelize = require('sequelize');
const { param } = require("../routes");
const trabajadorahogar = require("../models/trabajadorahogar");

// Create and Save a new Cita
exports.createDiscriminacion = (req, res) => {
    // Validate request
    // if (!req.body.formData.fechaInicio) {
    //     res.status(400).send({
    //         message: "Contenido no puede estar vacio!"
    //     });
    //     return;
    // }

    const caso = {
        n_documentacion= req.body.data.n_documentacion,
        trabajadorId: req.body.data.trabajadorId,
        finalizado:false
    };

       
    Caso.create(caso)
        .then(data => {
            const discriminacionVar = {
                id: data.id,
                Situacion_documental:req.body.data.situacion_documental,
                situacion_residencial:req.body.data.situacion_residencial,
                estudios:req.body.data.estudios,
                rasgos_fenotipicos:req.body.data.rasgos_fenotipicos,
                tipo:req.body.data.tipo,
                conflicto:req.body.data.conflicto,
                denegacion_privada:req.body.data.denegacion_privada,
                denegacion_publica:req.body.data.denegacion_publica,
                racismo:req.body.data.racismo,
                agente_discriminador:req.body.data.agente_discriminador,
                fecha:req.body.data.fecha,
                relato_hechos:req.body.data.relato_hechos,
                municipio:req.body.data.municipio,
                identificacion:req.body.data.identificacion,
                testigos:req.body.data.testigos,
                otros:req.body.data.otros,
                estrategia:req.body.data.estrategia,
                asumir:req.body.data.asumir,
                derivar:req.body.data.derivar
            }
            Discriminacion.create(discriminacionVar).then(data => {
                if(req.body.data.permiso_diario){
                    
                }
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ha habido algun error creando el caso."
                });
            });           
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha habido algun error creando el caso."
            });
        });

};

exports.createTrabajadoraHogar = (req, res) => {
    console.log(req.body.data)
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
        finalizado:false
    };

     
    Caso.create(caso)
        .then(data => {
            const trabajadoraHogar = {
                id:data.id,
                motivo:req.body.data.motivo,
                n_casas:parseInt(req.body.data.n_casas),
                regularizada:req.body.data.regularizada === 'true' ? true : false,
                fecha_inicio:Date(req.body.data.fecha_inicio),
                fecha_final:Date(req.body.data.fecha_final),
                fecha_despido:Date(req.body.data.fecha_despido),
                forma_empleo:req.body.data.forma_empleo,
                contratador:req.body.data.contratador,
                horario_base:req.body.data.horario_base,
                solo_fines_semana:req.body.data.solo_fines_semana === 'true' ? true : false,
                horas_totales:parseInt(req.body.data.horas_totales),
                libra_festivos:req.body.data.libra_festivos,
                no_libra_pero_cobra:req.body.data.no_libra_pero_cobra,
                salario_festivos:parseFloat(req.body.data.salario_festivos),
                salario:parseFloat(req.body.data.salario),
                pagas:parseFloat(req.body.data.pagas),
                forma_pago:req.body.data.forma_pago,
                contrato:req.body.data.contrato  === 'true' ? true : false,
                nomina:req.body.data.nomina  === 'true' ? true : false,
                seguridad_social:req.body.data.seguridad_social  === 'true' ? true : false,
                vacaciones:req.body.data.vacaciones,
                tipo_trabajo:req.body.data.tipo_trabajo,
                mayores:parseInt(req.body.data.mayores),
                genero_mayores:req.body.data.genero_mayores,
                enfermos:parseInt(req.body.data.enfermos),
                genero_enfermos:req.body.data.genero_enfermos,
                viven_solos:req.body.data.viven_solos === 'true' ? true : false
            }
            console.log(trabajadoraHogar)
            TrabajadoraHogar.create(trabajadoraHogar).then(data => {
            res.send(data)
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ha habido algun error creando la el caso."
                });
            });   
        res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha habido algun error creando el caso."
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
  exports.getCasoEspecificoById = (req, result) => {
    const id = req.params.id;
    Discriminacion.findAll({
      where: {
        id: id
      },
    })
      .then(data => {
        if (data.length === 0) {
            TrabajadoraHogar.findAll({
                where: {
                  id: id
                },
              }).then(data => {
                  result.send(data);
                }).catch(error => {
                  result.status(400).send(error)
                })
        }
        //result.send(data);
      }).catch(error => {
        result.status(400).send(error)
      })
  };

