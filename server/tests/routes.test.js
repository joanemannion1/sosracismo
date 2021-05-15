
const server = require('../server') // Link to your server file
const supertest = require('supertest')
const request = supertest(server)
const db = require("../models");
const Cita = db.citas;

let tokenVar = ''

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
    expect(response.body).toHaveProperty('message', 'Ese trabajador no existe')
  })

  it('Updates a Trabajador Password', async () => {
    const response = await request
      .put('/trabajador/update')
      .send({
        email: 'eposta@langilea.com',
        contraseña: 'pasahitza2',
        contraseña_actual: 'pasahitza',
      })

    expect(response.status).toBe(200)
  })

  it('Cant update a Trabajador Password if doesnt exist', async () => {
    const response = await request
      .put('/trabajador/update')
      .send({
        email: 'epostaezezaguna@langilea.com',
        contraseña: 'pasahitza2',
        contraseña_actual: 'pasahitza',
      })

      expect(response.status).toBe(403)
      expect(response.body).toHaveProperty('message','Trabajador no existe en la base de datos')
  })

  it('Cant update a Trabajador Password if password is incorrect', async () => {
    const response = await request
      .put('/trabajador/update')
      .send({
        email: 'eposta@langilea.com',
        contraseña: 'pasahitza2',
        contraseña_actual: 'pasahitzaokerra',
      })

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message',"La contraseña actual es incorrecta")
  })

  it("Can't delete trabajador that doesn't exist", async () => {
    const response = await request
      .delete('/trabajador/delete/epostaezezaguna@langilea.com')

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message')
  })

  it('Cant log in a Trabajador with incorrect email', async () => {
    const response = await request
      .post('/trabajador/login')
      .send({ email: 'epostaezezaguna@langilea.com', contraseña: 'pasahitza2' })

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('message',"User Not found.")
  })

  it('Cant log in a Trabajador with incorrect password', async () => {
    const response = await request
      .post('/trabajador/login')
      .send({ email: 'eposta@langilea.com', contraseña: 'pasahitzaokerra' })

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message',"Invalid Password!")
  })

  // afterAll(async done => {
  //   // Closing the DB connection allows Jest to exit successfully
  //   await db.Sequelize.close
  //   done();
  // });
})

describe('Tests for Usuario', () => {

  let tokenVar = ''

  // beforeAll(async () => {
  //   await db.databaseConf.sync();
  // });

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
      sedeId: 1,
      trabajadorId: 'eposta@langilea.com',
      nacionalidad: [{ name: 'nacionalidad0', value: 'ES' }, { name: 'nacionalidad1', value: 'GB' }]
    };
    const response = await request
      .post('/usuario/create')
      .send({ data })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('nombre', 'Usuario')
  })

  it('Create a Usuario2', async () => {
    const data = {
      tipo_documentacion: 'nie',
      n_documentacion: '22222222A',
      nombre: 'Usuario',
      apellido1: 'Apellido1',
      apellido2: 'Apellido2',
      genero: 'm',
      email: 'email2@usuario.com',
      telefono: 665555333,
      direccion: 'Dirección',
      localidad: 'Localidad',
      cp: 20800,
      provincia: 'Gipuzkoa',
      pais_origen: 'ES',
      sedeId: 1,
      trabajadorId: 'eposta@langilea.com',
      nacionalidad: [{ name: 'nacionalidad0', value: 'ES' }, { name: 'nacionalidad1', value: 'GB' }]
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
      sedeId: 1,
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

  it('Cant retrieve all Usuarios that an especific Trabajador has inserted if token is incorrect', async () => {
    const response = await request
      .get('/usuarios/all/' + 'incorrectToken')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('auth', false)
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
      sedeId: 1,
      trabajadorId: 'eposta@langilea.com',
      nacionalidad: [{ name: 'nacionalidad0', value: 'ES' }]
    };

    const response = await request
      .post('/usuario/update/11111111A')
      .send({ data })

    expect(response.status).toBe(200)
  })

  it('Cant update a User if it doesnt exist', async () => {
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
      sedeId: 1,
      trabajadorId: 'eposta@langilea.com',
      nacionalidad: [{ name: 'nacionalidad0', value: 'ES' }]
    };

    const response = await request
      .post('/usuario/update/00000')
      .send({ data })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', `Cannot update User with id=00000. Maybe User was not found or req.body is empty!`)
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
    expect(response.body[0]).toHaveProperty('sede', 1)
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

  it('Get number of users by necesidad for excel', async () => {
    const response = await request
      .get('/usuarios/count/necesidad')

    expect(response.status).toBe(200)
  })

  it("Delete user by ID", async () => {
    const response = await request
      .delete('/usuario/delete/22222222A')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message',"El usuario ha sido eliminado correctamente.")
  })

  it("Can't delete user that doesn't exist", async () => {
    const response = await request
      .delete('/usuario/delete/0000')

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message',`No se ha podido eliminar el usuario con id=0000!`)
  })



  // afterAll(async done => {
  //   // Closing the DB connection allows Jest to exit successfully
  //   await db.Sequelize.close
  //   done();
  // });
})

describe('Tests for Cita', () => {
  // beforeAll(async () => {
  //     await db.databaseConf.sync();
  //   });

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

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message')
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

  it('Cant delete cita with nonexistent Id', async () => {
    const response = await request
      .delete('/cita/delete/' + 0)

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', `No se ha podido eliminar la cita con id=0!`)
  })

})
let discriminacionId = 0;
let extranjeriaId = 0;
let trabajadoraHogarId = 0;

describe('Tests for Caso', () => {
  // beforeAll(async () => {
  //   await db.databaseConf.sync();
  // });


  it('Create a Caso Discriminación', async () => {
    const data = {
      n_documentacion: '11111111A',
      trabajadorId: 'eposta@langilea.com',
      finalizado: false,
      Situacion_documental: 'Situación documental',
      situacion_residencial: 'Situación residencial',
      estudios: 'Estudios',
      rasgos_fenotipicos: 'Rasgos fenotípicos',
      tipo: 'Tipo',
      conflicto: 'Conflicto',
      denegacion_privada: '',
      denegacion_publica: '',
      racismo: '',
      agente_discriminador: 'Agente discriminador',
      fecha: new Date(),
      relato_hechos: 'Relato hechos',
      municipio: 'Municipio',
      identificacion: 'Identificación',
      testigos: 'Testigos',
      otros: 'Otros datos',
      estrategia: 'Estrategia',
      asumir: 'Asumir',
      derivar: ''
    };
    const response = await request
      .post('/caso/create/discriminacion')
      .send({ data })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', ' El caso ha sido añadido correctamente')
    discriminacionId = response.body.caso
  })

  it('Update a Caso Discriminación', async () => {
    const data = {
      n_documentacion: '11111111A',
      trabajadorId: 'eposta@langilea.com',
      finalizado: false,
      Situacion_documental: 'Situación documental2',
      situacion_residencial: 'Situación residencial2',
      estudios: 'Estudios',
      rasgos_fenotipicos: 'Rasgos fenotípicos',
      tipo: 'Tipo',
      conflicto: 'Conflicto',
      denegacion_privada: '',
      denegacion_publica: '',
      racismo: '',
      agente_discriminador: 'Agente discriminador',
      fecha: new Date(),
      relato_hechos: 'Relato hechos',
      municipio: 'Municipio',
      identificacion: 'Identificación',
      testigos: 'Testigos',
      otros: 'Otros datos',
      estrategia: 'Estrategia',
      asumir: 'Asumir',
      derivar: ''
    };
    const response = await request
      .post('/caso/update/discriminacion/' + discriminacionId)
      .send({ data })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'El caso ha sido actualizado correctamente.')
  })

  it('Finalizar Caso Discriminación by Id', async () => {
    const response = await request
      .get('/caso/finalizar/' + discriminacionId)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', "El caso ha sido finalizado correctamente")
  })



  it('Create a Caso Extranjeria', async () => {
    const data = {
      n_documentacion: '11111111A',
      trabajadorId: 'eposta@langilea.com',
      finalizado: false,
      necesidad: ['necesidad1', 'necesidad2'],
      proyectos: ['proyecto1', 'proyecto2'],
    };
    const response = await request
      .post('/caso/create/extranjeria')
      .send({ data })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', ' El caso ha sido añadido correctamente')
    extranjeriaId = response.body.caso
  })

  // it('Update a Caso Extranjeria', async () => {
  //   const data = {
  //     n_documentacion: '11111111A',
  //     trabajadorId: 'eposta@langilea.com',
  //     finalizado: false,
  //     necesidad: ['necesidad3'],
  //     proyectos: ['proyecto3']
  //   };
  //   const response = await request
  //     .post('/caso/update/extranjeria/' + extranjeriaId)
  //     .send({ data })

  //   expect(response.status).toBe(200)
  //   expect(response.body).toHaveProperty('message', 'El caso ha sido actualizado correctamente.')
  // })

  it('Finalizar Caso Extranjeria by Id', async () => {
    const response = await request
      .get('/caso/finalizar/' + extranjeriaId)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', "El caso ha sido finalizado correctamente")
  })


  it('Create a Caso Trabajadora del Hogar', async () => {
    const data = {
      n_documentacion: '11111111A',
      trabajadorId: 'eposta@langilea.com',
      finalizado: false,
      motivo: 'Motivo',
      n_casas: 2,
      regularizada: false,
      fecha_inicio: new Date(),
      fecha_final: new Date(),
      fecha_despido: new Date(),
      forma_empleo: 'Forma empleo',
      contratador: 'Contratador',
      horario_base: 'Horario base',
      solo_fines_semana: true,
      horas_totales: 35,
      libra_festivos: 'Si',
      no_libra_pero_cobra: 0,
      salario_festivos: 100.0,
      salario: 100.0,
      pagas: 100.0,
      forma_pago: 'Forma pago',
      contrato: false,
      nomina: false,
      seguridad_social: false,
      vacaciones: 'Vacaciones',
      tipo_trabajo: 'Tipo trabajo',
      mayores: 2,
      genero_mayores: 'h',
      enfermos: 2,
      genero_enfermos: 'm',
      viven_solos: true
    }
    const response = await request
      .post('/caso/create/trabajadoraHogar')
      .send({ data })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', ' El caso ha sido añadido correctamente')
    trabajadoraHogarId = response.body.caso
  })

  it('Update a Caso Trabajadora del Hogar', async () => {
    const data = {
      n_documentacion: '11111111A',
      trabajadorId: 'eposta@langilea.com',
      finalizado: false,
      motivo: 'Motivo 1',
      n_casas: 2,
      regularizada: false,
      fecha_inicio: new Date(),
      fecha_final: new Date(),
      fecha_despido: new Date(),
      forma_empleo: 'Forma empleo 2',
      contratador: 'Contratador',
      horario_base: 'Horario base',
      solo_fines_semana: true,
      horas_totales: 35,
      libra_festivos: 'Si',
      no_libra_pero_cobra: 0,
      salario_festivos: 100.0,
      salario: 100.0,
      pagas: 100.0,
      forma_pago: 'Forma pago',
      contrato: false,
      nomina: false,
      seguridad_social: false,
      vacaciones: 'Vacaciones',
      tipo_trabajo: 'Tipo trabajo',
      mayores: 2,
      genero_mayores: 'h',
      enfermos: 2,
      genero_enfermos: 'm',
      viven_solos: true
    }
    const response = await request
      .post('/caso/update/trabajadoraHogar/' + trabajadoraHogarId)
      .send({ data })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'El caso ha sido actualizado correctamente.')
  })

  it('Finalizar Caso Trabajadora Hogar by Id', async () => {
    const response = await request
      .get('/caso/finalizar/' + trabajadoraHogarId)


    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', "El caso ha sido finalizado correctamente")
  })


  it('Correctly log in a Trabajador', async () => {
    const response = await request
      .post('/trabajador/login')
      .send({ email: 'eposta@langilea.com', contraseña: 'pasahitza2' })

    expect(response.status).toBe(200)
    tokenVar = response.body.accessToken
  })

  it('Gets all casos', async () => {
    const response = await request
      .get('/casos/all/' + tokenVar)

    expect(response.status).toBe(200)
  })

  it('Gets all casos no finalizados', async () => {
    const response = await request
      .get('/casos/allActive/' + tokenVar)

    expect(response.status).toBe(200)
  })

  it('Get caso by Id', async () => {
    const response = await request
      .get('/caso/' + trabajadoraHogarId)

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('trabajadorId', 'eposta@langilea.com')
  })

  it('Get caso Especifico Trabajadora del Hogar by Id', async () => {
    const response = await request
      .get('/casoEspecifico/trabajadora/' + trabajadoraHogarId)

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('motivo', 'Motivo 1')
  })

  it('Get caso Especifico Discriminacion by Id', async () => {
    const response = await request
      .get('/casoEspecifico/discriminacion/' + discriminacionId)

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('estudios', 'Estudios')
  })

  it('Get caso Especifico Extranjeria by Id', async () => {
    const response = await request
      .get('/casoEspecifico/extranjeria/' + extranjeriaId)

    expect(response.status).toBe(200)
  })

  it('Get Necesidades of a Caso by Id', async () => {
    const response = await request
      .get('/necesidad/' + extranjeriaId)

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('necesidad', 'necesidad1')
  })

  it('Get Proyectos of a Caso by Id', async () => {
    const response = await request
      .get('/proyecto/' + extranjeriaId)

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('proyecto', 'proyecto1')
  })

  it('Get Type of a Caso by Id', async () => {
    const response = await request
      .get('/casoType/' + extranjeriaId)

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('tablename', 'Extranjeria')
  })

})

describe('Tests for Intervencion', () => {

  let intervencionId = 0
  beforeAll(async () => {
    await db.databaseConf.sync();
  });

  it('Creates a Intervencion', async () => {
    const response = await request
      .post('/intervencion/createdoc')
      .send({
        casoId: discriminacionId,
        nombre: 'Intervencion',
        descripcion: 'Descripcion'
      })

    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('nombre', 'Intervencion')
    intervencionId = response.body.data.id
  })

  it('Gives error if we dont send data', async () => {
    const response = await request
      .post('/intervencion/createdoc')
      .send({})

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', "Contenido no puede estar vacio!")
  })

  it('Gets all intervenciones by caso', async () => {
    const response = await request
      .get('/intervenciones/caso/' + discriminacionId)

    expect(response.status).toBe(200)
  })

  it('Deletes intervencion by id', async () => {
    const response = await request
      .delete('/intervencion/delete/' + intervencionId)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', "La intervención ha sido eliminada correctamente.")
  })
})

describe('Delete created data', () => {
  it('Deletes Caso Extranjeria by Id', async () => {
    const response = await request
      .delete('/caso/delete/' + extranjeriaId)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', "El caso ha sido eliminado correctamente.")
  })

  it('Deletes Caso Discriminación by Id', async () => {
    const response = await request
      .delete('/caso/delete/' + discriminacionId)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', "El caso ha sido eliminado correctamente.")
  })

  it('Deletes Caso Trabajadora Hogar by Id', async () => {
    const response = await request
      .delete('/caso/delete/' + trabajadoraHogarId)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', "El caso ha sido eliminado correctamente.")
  })
  // it('Deletes trabajador by Email', async () => {
  //   const response = await request
  //     .delete('/trabajador/delete/eposta@langilea.com')

  //   expect(response.status).toBe(200)
  //   expect(response.body).toHaveProperty('message', "El trabajador ha sido eliminado correctamente.")
  // })
})

describe('With db connection closed', () => {
  
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

    expect(response.status).toBe(500)


  })

  it('Deletes cita by Id', async () => {
    const response = await request
      .delete('/cita/delete/' + 0)

    expect(response.status).toBe(500)
  })

})
