
const server = require('../server') // Link to your server file
const supertest = require('supertest')
const request = supertest(server)
const db = require("../models");

describe('Tests for Sede', () => {

  beforeAll(async () => {
    await db.databaseConf.sync();
  });

  it('Creates a Sede', async () => {
    data = { nombre: 'Hernaniko Sos', localidad: 'Hernani' }
    const response = await request
      .post('/sede/create')
      .send({ data })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('localidad')
  })

  it('Gives error if we dont send data', async () => {
    data = {}
    const response = await request
      .post('/sede/create')
      .send({ data })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', "Contenido no puede estar vacio!")
  })

  it('Gets all sedes', async () => {
    const response = await request
      .get('/sedes/all')

    expect(response.status).toBe(200)
  })

})

describe('Tests for Trabajador', () => {

  // beforeAll(async () => {
  //   await db.databaseConf.sync();
  // });

it('Creates a Trabajador', async () => {
  const data = {
    nombre: 'Langile Izena',
    email: 'eposta@langilea.com',
    contraseña: 'pasahitza',
    admin: 1,
    sedeId: 3,
    color: '673ab7',
  };
  const response = await request
    .post('/trabajador/create')
    .send({ data })

  expect(response.status).toBe(200)
  expect(response.body).toHaveProperty('nombre', 'Langile Izena')
})

  it('Create Trabajador : Gives error if we dont send data', async () => {
    data = {}
    const response = await request
      .post('/trabajador/create')
      .send({ data })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', "Contenido no puede estar vacio!")
  })

  it("Can't create Trabajador with email that exists", async () => {
    const data = {
      nombre: 'Langile Izena',
      email: 'eposta@langilea.com',
      contraseña: 'pasahitza',
      admin: 1,
      sedeId: 3,
      color: '673ab7',
    };
    const response = await request
      .post('/trabajador/create')
      .send({ data })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message')
  })

  it('Gets all trabajadores', async () => {
    const response = await request
      .get('/trabajadores/all')

    expect(response.status).toBe(200)
  })

  it('Gets all trabajador by Email', async () => {
    const response = await request
      .get('/trabajador/eposta@langilea.com')

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('nombre', 'Langile Izena')
  })

  it("Can't find trabajador that doesn't exist", async () => {
    const response = await request
      .get('/trabajador/epostaezezaguna@langilea.com')

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message')
  })

  it('Updates a Trabajador', async () => {
    const response = await request
      .put('/trabajador/update')
      .send( {
        email: 'eposta@langilea.com',
        contraseña: 'pasahitza2',
        contraseña_actual: 'pasahitza',
      })

    expect(response.status).toBe(200)
  })

  it('Correctly log in a Trabajador', async () => {
    const response = await request
      .post('/trabajador/login')
      .send({ email: 'eposta@langilea.com', contraseña : 'pasahitza2' })

    expect(response.status).toBe(200)
  })



  // it('Deletes trabajador by Email', async () => {
  //   const response = await request
  //     .delete('/trabajador/delete/eposta@langilea.com')

  //   expect(response.status).toBe(200)
  //   expect(response.body).toHaveProperty('message', "El trabajador ha sido eliminado correctamente.")
  // })

  it("Can't delete trabajador that doesn't exist", async () => {
    const response = await request
      .delete('/trabajador/delete/epostaezezaguna@langilea.com')

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message')
  })



  // afterAll(async done => {
  //   // Closing the DB connection allows Jest to exit successfully
  //   await db.Sequelize.close
  //   done();
  // });
})

describe('Tests for Usuario', () => {

  let tokenVar = ''

beforeAll(async () => {
  await db.databaseConf.sync();
});

  it('Create a Usuario', async () => {
    const data = {
      tipo_documentacion: 'nie',
      n_documentacion: '11111111A',
      nombre: 'Usuario',
      apellido1: 'Apellido1',
      apellido2: 'Apellido2',
      genero: 'm',
      email: 'email@usuario.com',
      telefono: 666555333,
      direccion: 'Dirección',
      localidad: 'Localidad',
      cp: 20800,
      provincia: 'Gipuzkoa',
      pais_origen: 'ES',
      sedeId: 2,
      trabajadorId: 'eposta@langilea.com',
      nacionalidad: [{name: 'nacionalidad0', value: 'ES'}, {name: 'nacionalidad1', value: 'GB'}]
    };
    const response = await request
      .post('/usuario/create')
      .send({ data })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('nombre', 'Usuario')
  })

  it('Create Usuario : Gives error if we dont send data', async () => {
    data = {}
    const response = await request
      .post('/usuario/create')
      .send({ data })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', "Contenido no puede estar vacio!")
  })

  it("Can't create Usuario with nº documentación that exists", async () => {
    const data = {
      tipo_documentacion: 'NIE',
      n_documentacion: '11111111A',
      nombre: 'Usuario',
      apellido1: 'Apellido1',
      apellido2: 'Apellido2',
      genero: 'm',
      email: 'email@usuario.com',
      telefono: 666555333,
      direccion: 'Dirección',
      localidad: 'Localidad',
      cp: 20800,
      provincia: 'Gipuzkoa',
      pais_origen: 'ES',
      sedeId: 2,
      trabajadorId: 'eposta@langilea.com',
    };
    const response = await request
      .post('/usuario/create')
      .send({ data })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message')
  })

  it('Gets all Usuarios by Nº Documentación', async () => {
    const response = await request
      .get('/usuario/getByDocumentacion/11111111A')

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('nombre', 'Usuario')
  })

  it("Can't find Usuario that doesn't exist", async () => {
    const response = await request
      .get('/usuario/getByDocumentacion/00000000A')

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message')
  })

  it('Correctly log in a Trabajador', async () => {
    const response = await request
      .post('/trabajador/login')
      .send({ email: 'eposta@langilea.com', contraseña: 'pasahitza2' })

    expect(response.status).toBe(200)
    tokenVar = response.body.accessToken
  })


  it('Gets all Usuarios of a Trabajador', async () => {
    const response = await request
      .get('/usuarios/all/' + tokenVar)

    expect(response.status).toBe(200)
  })

  it('Updates a User', async () => {
    const data = {
      tipo_documentacion: 'NIE',
      n_documentacion: '11111111A',
      nombre: 'Usuario Nuevo',
      apellido1: 'Apellido1',
      apellido2: 'Apellido2',
      genero: 'm',
      email: 'email@usuario.com',
      telefono: 666555333,
      direccion: 'Dirección',
      localidad: 'Localidad',
      cp: 20800,
      provincia: 'Gipuzkoa',
      pais_origen: 'ES',
      sedeId: 2,
      trabajadorId: 'eposta@langilea.com',
      nacionalidad: [{name: 'nacionalidad0', value: 'ES'}]
    };

    const response = await request
      .post('/usuario/update/11111111A')
      .send({ data })

    expect(response.status).toBe(200)
  })

  it('Check if telefono exists', async () => {
    const response = await request
      .get('/usuario/checkTelefono/666555333')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('userExists', true)
  })

  it('If telefono doesnt exist returns false', async () => {
    const response = await request
      .get('/usuario/checkTelefono/000000000')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('userExists', false)
  })

  it('Retrieve all nationalities that an especific Trabajador has inserted', async () => {
    const response = await request
      .get('/usuarios/nacionalidad/' + tokenVar)

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('nacionalidad', 'ES')
  })

  it('Cant retrieve all nationalities that an especific Trabajador has inserted if token is incorrect', async () => {
    const response = await request
      .get('/usuarios/nacionalidad/' + 'incorrectToken')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('auth', false)
  })

  it('Retrieve all sedes that an especific Trabajador has inserted', async () => {
    const response = await request
      .get('/usuarios/sede/' + tokenVar)

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('sede', 2)
  })

  it('Cant retrieve all sedes that an especific Trabajador has inserted if token is incorrect', async () => {
    const response = await request
      .get('/usuarios/sede/' + 'incorrectToken')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('auth', false)
  })

  it('Get number of users by nationalities for excel', async () => {
    const response = await request
      .get('/usuarios/count/nacionalidad')

    expect(response.status).toBe(200)
  })


  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully
    await db.Sequelize.close
    done();
  });
})

describe('Tests for Cita', () => {
  beforeAll(async () => {
      await db.databaseConf.sync();
    });

    var citaId = 26;

  it('Create a Cita', async () => {
    const formData = {
      fechaInicio: new Date(),
      fechaFin: new Date(),
      nombre: 'Nombre Cita',
      notas: 'Notas de Cita',
      trabajador: 'eposta@langilea.com',
      usuario: '11111111A'
    };
    const response = await request
      .post('/cita/create')
      .send({ formData })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('nombre', 'Nombre Cita')
        citaId = response.body.id

  })

  it('Create Cita : Gives error if we dont send data', async () => {
    formData = {}
    const response = await request
      .post('/cita/create')
      .send({ formData })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', "Contenido no puede estar vacio!")
  })

  it('Create a Cita without a Usuario', async () => {
    const formData = {
      fechaInicio: new Date(),
      fechaFin: new Date(),
      nombre: 'Nombre Cita',
      notas: 'Notas de Cita',
      trabajador: 'eposta@langilea.com',
      usuario: ''
    };
    const response = await request
      .post('/cita/create')
      .send({ formData })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('nombre', 'Nombre Cita')
  })

  it('Can not create a Cita without a Trabajador', async () => {
    const formData = {
      fechaInicio: new Date(),
      fechaFin: new Date(),
      nombre: 'Nombre Cita',
      notas: 'Notas de Cita',
      trabajador: '',
      usuario: '11111111A'
    };
    const response = await request
      .post('/cita/create')
      .send({ formData })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('nombre', 'Nombre Cita')
  })

    it('Gets all citas', async () => {
    const response = await request
      .get('/citas/all')

    expect(response.status).toBe(200)
  })

    it('Deletes cita by Id', async () => {
    const response = await request
      .delete('/cita/delete/' + citaId)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', "La cita ha sido eliminado correctamente.")
  })

  it("Can't delete trabajador that doesn't exist", async () => {
    const response = await request
      .delete('/cita/delete/0')

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message')
  })

})

