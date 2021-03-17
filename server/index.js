const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const mysql = require('mysql');
const { db } = require('./models');

require('./routes');

var corsOptions = {
  origin: "http://localhost:3001"
};

async function main() {
  await sequelize.sync( {alter: true});
}

main()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

db.sequelize.sync();


app.post('/crearTrabajador', async(req, res)=> {
  const {nombre, email, contraseña, admin, id_sede, color} = req.body;

  try{
    const trabajador = await trabajador.create({nombre, email, contraseña, admin, id_sede, color});

    return res.json(user);
  } catch(err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get('/trabajador', async(req,res) => {
  try {
    const trabajadores = await Trabajador.findAll();

    return res.json(trabajadores)
  } catch(err) {
    console.log(err);
    return res.status(500).jsono({ error: 'Something went wrong'});
  }
})

app.get('/trabajador/:email', async(req,res) => {
  try {
    const email = req.params.email;

    const trabajador = await Trabajador.findOne({
      where: { email },
    });

    return res.json(trabajador)
  } catch(err) {
    console.log(err);
    return res.status(500).jsono({ error: 'Something went wrong'});
  }
})

app.listen(3001, async () => {
  console.log("Yey, your server is running on port 3001");
  await sequelize.authenticate();
  console.log('Database connected!');
})


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'sosracismo'
});

// app.post('/crearTrabajador', (req, res) => {
//     const nombre = req.body.nombre
//     const email = req.body.email
//     const contraseña = req.body.contraseña
//     const admin = req.body.admin
//     const id_sede = 1
//     const color = req.body.color

//     db.query('INSERT INTO trabajador (nombre, email, contraseña, admin, id_sede, color) VALUES (?,?,?,?,?,?)', 
//     [nombre, email, contraseña, admin, id_sede, color], 
//     (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send("Values inserted");
//         }
//     })

// })

// app.post('/cambiarContrasena', (req, res) => {
//   const email = req.body.email
//   const nueva_contraseña = req.body.nueva_contraseña
//   const contraseña_actual = req.body.contraseña_actual

//   db.query('UPDATE trabajador SET contraseña =' + nueva_contraseña + 'WHERE email = ' + email, 
//   (err, result) => {
//       if (err) {
//           console.log(err);
//       } else {
//           res.send("Values inserted");
//       }
//   })

// })


app.get("/getSede", (req, res) => {
    db.query("SELECT * FROM sede", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

// app.get("/getSede", (req, res) => {
//     db.query("SELECT * FROM usuarios WHERE DNI = ", (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     });
// });