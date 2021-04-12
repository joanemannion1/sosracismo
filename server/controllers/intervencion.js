const db = require("../models");
const Intervencion = db.intervenciones;
const Documento = db.documentos;
const Sequelize = require('sequelize');
const { param } = require("../routes");
var path = require('path');

var multer = require('multer');
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, "DOC-" + Date.now() + file.originalname);
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
}).array('files');

// Create an Intervencion
exports.createDoc = (req, res) => {
    {

        upload(req, res, (err) => {
            if (err) {
                res.status(400).send("Something went wrong!");
            }
            const intervencion = {
                casoId: req.body.casoId,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
            };
            console.log(req.files)
            Intervencion.create(intervencion)
                .then(data => {
                    req.files.map(file => {
                        var doc = {
                            intervencionId: data.id,
                            nombre: file.originalname,
                            type: file.mimetype,
                            file_path: file.path,
                        }
                        Documento.create(doc).then(data => {
                        })
                    })
                    res.send("La intervencion ha sido añadida")
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Ha habido algun error creando la intervención."
                    });
                });
        });
    }

}

//Download File
exports.downloadFileByName = (req, res) => {
    try {
        var id = req.params.id;
        Documento.findAll({
            where: {
                id: id
            },
            attributes: ['file_path', 'type']
        }).then(data => {
            // res.set({
            //     'Content-Type': data[0].type
            // });
            res.sendFile(path.resolve(__dirname + '/../' + data[0].file_path))
        }).catch(error => {
            res.status(400).send(error)
        })

    } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
    }
};

//Download File
exports.getAllByCaso = (req, res) => {
    var id = req.params.casoId;
    db.databaseConf.query("SELECT Intervencion.*, Documentos.id AS docId, Documentos.nombre AS docNombre, Documentos.type AS type FROM Intervencion LEFT OUTER JOIN Documentos on Intervencion.id = Documentos.intervencionId WHERE casoId = " + id).then(results => {
        res.send(results[0])
    });
};

