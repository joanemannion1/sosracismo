const request = require('supertest')

const faker = require('faker');
const puppeteer = require('puppeteer');


const newTrabajador = {
  nombre: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  sede: 1,
  admin: 1,
  color: faker.commerce.color()
};

const trabajador = {
  email: 'eposta@langilea.com',
  password: 'pasahitza2',
};
const appUrlBase = 'http://localhost:3000'
const routes = {
  public: {
    login: `${appUrlBase}/LogIn`,
  },
  private: {
    crearTrabajador: `${appUrlBase}/CrearTrabajador`,
    account: `${appUrlBase}/account`,
  },
};

// describe('Login', () => {
//   test('users can login', async () => {
//     let browser = await puppeteer.launch({
//       headless: false
//     });
//     let page = await browser.newPage();
//     await page.goto(routes.public.login);
//     await page.waitForSelector('.form-signin');

//     await page.click('input[name=email]')
//     await page.type('input[name=email]', trabajador.email)
//     await page.click('input[name=contraseña]')
//     await page.type('input[name=contraseña]', trabajador.password)
//     await page.click('button[type=submit]')
//     // await page.waitForSelector('[data-testid="homepage"]')
//   }, 1600000);
// });

describe('Tests for trabajador', () => {
  beforeAll(async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/LogIn');

    await page.click('input[name=email]')
    await page.type('input[name=email]', trabajador.email)
    await page.click('input[name=contraseña]')
    await page.type('input[name=contraseña]', trabajador.password)
    await page.click('button[type=submit]')

    await page.waitForSelector('#inputGender')

  });
  // test('Creates a Trabajador', async () => {
  //   let browser = await puppeteer.launch({
  //     headless: false
  //   });
  //   let page = await browser.newPage();
  //   await page.goto('http://localhost:3000/LogIn');

  //   await page.click('input[name=email]')
  //   await page.type('input[name=email]', trabajador.email)
  //   await page.click('input[name=contraseña]')
  //   await page.type('input[name=contraseña]', trabajador.password)
  //   await page.click('button[type=submit]')

  //   await page.waitForSelector('#inputGender')
  //   await page.goto('http://localhost:3000/CrearTrabajador', { waitUntil: 'domcontentloaded' });


  //   await page.click("input[name=nombre]");
  //   await page.type("input[name=nombre]", newTrabajador.nombre);
  //   await page.click("input[name=email]");
  //   await page.type("input[name=email]", newTrabajador.email);
  //   await page.click("input[type=checkbox]");

  //   await page.click("button[type=submit]");

  //   await page.waitForSelector('#successAlert')

  //   browser.close();

  // }, 9000000)

  //     test('Updates an existing Trabajador correctly', async () => {
  //   await page.goto('http://localhost:3000/ActualizarTrabajador/' + newTrabajador.email);

  //   await page.click("input[name=nombre]");
  //   await page.type("input[name=nombre]", '2');

  //   await page.click("button[type=submit]");

  //   await page.waitForSelector('#successAlert')

  // }, 9000000)

  // test('Deletes an existing Trabajador correctly', async () => {
  //   await page.goto('http://localhost:3000/ActualizarTrabajador/' + newTrabajador.email);

  //   await page.click("button[name=eliminarTrabajador]");

  //   const [button] = await page.$x("//button[contains(., 'Si, eliminar!')]");

  //   if (button) {
  //     await button.click()
  //   }
  // })

      test('View all existing Trabajadores correctly', async () => {
    await page.goto('http://localhost:3000/VerTrabajadores');

  }, 9000000)


  afterAll(async done => {
    browser.close()
    done();
  });
})

// const usuario = {
//   tipo_documentacion: 'nie',
//   n_documentacion: '22222222B',
//   nombre: 'Usuario',
//   apellido1: 'Apellido1',
//   apellido2: 'Apellido2',
//   genero: 'm',
//   email: 'email@usuario.com',
//   telefono: '666555334',
//   direccion: 'Dirección',
//   localidad: 'Localidad',
//   cp: 20800,
//   provincia: 'Gipuzkoa',
//   pais_origen: 'ES',
//   sedeId: '1',
//   trabajadorId: 'eposta@langilea.com',
//   nacionalidad: { name: 'nacionalidad0', value: 'ES' }
// };

// describe('Create Usuario', () => {
//   let page;
//   beforeAll(async () => {
//     let browser = await puppeteer.launch({
//       headless: false
//     });
//     page = await browser.newPage();
//     await page.goto('http://localhost:3000/LogIn');

//     await page.click('input[name=email]')
//     await page.type('input[name=email]', trabajador.email)
//     await page.click('input[name=contraseña]')
//     await page.type('input[name=contraseña]', trabajador.password)
//     await page.click('button[type=submit]')

//     await page.waitForSelector('#inputGender')

//   });

//   test('Creates a new User correctly', async () => {

//     await page.click("input[name=nombre]");
//     await page.type("input[name=nombre]", usuario.nombre);
//     await page.click("input[name=apellido1]");
//     await page.type("input[name=apellido1]", usuario.apellido1);
//     await page.click("input[name=apellido2]");
//     await page.type("input[name=apellido2]", usuario.apellido2);
//     await page.select('select[name="tipo_documentacion"]', usuario.tipo_documentacion);
//     await page.click("input[name=n_documentacion]");
//     await page.type("input[name=n_documentacion]", usuario.n_documentacion);
//     await page.select('select[name="genero"]', usuario.genero);
//     await page.select('select[name="sedeId"]', usuario.sedeId);
//     await page.click("input[name=email]");
//     await page.type("input[name=email]", usuario.email);
//     await page.click("input[name=telefono]");
//     await page.type("input[name=telefono]", usuario.telefono);

//     await page.click("button[type=submit]");

//     await page.waitForSelector('#successAlert')

//   }, 9000000)

//   test('Gets error creating user with duplicated ID', async () => {
//     await page.click("input[name=nombre]");
//     await page.type("input[name=nombre]", usuario.nombre);
//     await page.click("input[name=apellido1]");
//     await page.type("input[name=apellido1]", usuario.apellido1);
//     await page.click("input[name=apellido2]");
//     await page.type("input[name=apellido2]", usuario.apellido2);
//     await page.select('select[name="tipo_documentacion"]', usuario.tipo_documentacion);
//     await page.click("input[name=n_documentacion]");
//     await page.type("input[name=n_documentacion]", usuario.n_documentacion);
//     await page.select('select[name="genero"]', usuario.genero);
//     await page.select('select[name="sedeId"]', usuario.sedeId);
//     await page.click("input[name=email]");
//     await page.type("input[name=email]", usuario.email);
//     await page.click("input[name=telefono]");
//     await page.type("input[name=telefono]", usuario.telefono);


//     await page.click("button[type=submit]");

//     await page.waitForSelector('#errorAlert')

//   }, 9000000)

//     test('Updates an existing User correctly', async () => {
//     await page.goto('http://localhost:3000/AñadirUsuario/22222222B');

//     await page.click("input[name=nombre]");
//     await page.type("input[name=nombre]", '2');

//     await page.click("button[type=submit]");

//     await page.waitForSelector('#successAlert')

//   }, 9000000)

  //   test('Deletes an existing User correctly', async () => {
  //   await page.goto('http://localhost:3000/AñadirUsuario/22222222B');

  //   await page.click("button[name=eliminarUsuario]");

  //   const [button] = await page.$x("//button[contains(., 'Si, eliminar!')]");

  //     if(button) {
  //       await button.click()
  //     }


  // }, 9000000)


//     test('View all existing Users correctly', async () => {
//     await page.goto('http://localhost:3000/SideBar');

//   }, 9000000)
//   afterAll(async done => {
//     browser.close()
//     done();
//   });
// })


// describe('Create a Caso', () => {
//   let page;
//   const casoDiscriminacion = {
//     Situacion_documental: 'NIE',
//     situacion_residencial: 'Otros',
//     estudios: 'Sin estudios',
//     rasgos_fenotipicos: 'Rasgos fenotípicos',
//     tipo: 'Laboral',
//     agente_discriminador: 'Otros',
//     relato_hechos: 'Relato hechos',
//     municipio: 'Municipio',
//     identificacion: 'Identificación',
//     testigos: 'Testigos',
//     otros: 'Otros datos',
//     estrategia: 'Derivar',
//     derivar: 'Derivamos'
//   };

//   beforeAll(async () => {
//     let browser = await puppeteer.launch({
//       headless: false
//     });
//     page = await browser.newPage();
//     await page.goto('http://localhost:3000/LogIn');

//     await page.click('input[name=email]')
//     await page.type('input[name=email]', trabajador.email)
//     await page.click('input[name=contraseña]')
//     await page.type('input[name=contraseña]', trabajador.password)
//     await page.click('button[type=submit]')

//     await page.waitForSelector('#inputGender')

//   });

  // test('Creates a new Caso correctly', async () => {
  //   await page.goto('http://localhost:3000/AñadirCaso/22222222B');

  //   await page.click("#showDiscriminacion")

  //   await page.select('select[name="Situacion_documental"]', casoDiscriminacion.Situacion_documental);
  //   await page.select('select[name="situacion_residencial"]', casoDiscriminacion.situacion_residencial);
  //   await page.select('select[name="estudios"]', casoDiscriminacion.estudios)
  //   await page.click("textarea[name=rasgos_fenotipicos]");
  //   await page.type("textarea[name=rasgos_fenotipicos]", casoDiscriminacion.rasgos_fenotipicos);
  //   await page.select('select[name="tipo"]', casoDiscriminacion.tipo)
  //   await page.select('select[name="agente_discriminador"]', casoDiscriminacion.agente_discriminador)
  //   await page.type("input[name=fecha]", "01042020")
  //   await page.click("input[name=municipio]");
  //   await page.type("input[name=municipio]", casoDiscriminacion.municipio);
  //   await page.click("textarea[name=relato_hechos]");
  //   await page.type("textarea[name=relato_hechos]", casoDiscriminacion.relato_hechos);
  //   await page.click("input[name=identificacion]");
  //   await page.type("input[name=identificacion]", casoDiscriminacion.identificacion);
  //   await page.click("input[name=testigos]");
  //   await page.type("input[name=testigos]", casoDiscriminacion.testigos);
  //   await page.select('select[name="estrategia"]', casoDiscriminacion.estrategia)
  //   await page.click("textarea[name=derivar]");
  //   await page.type("textarea[name=derivar]", casoDiscriminacion.derivar);

  //   await page.click("button[name=discriminacionSubmit]");

  //   await page.waitForSelector('#successAlert')

  // }, 9000000)

  // test('Updates an existing Caso correctly', async () => {

    //118 akin ze ingoeeeet¿


    //   await page.goto('http://localhost:3000/VerCaso/118');

    //   await page.click("input[name=municipio]");
    //   await page.type("input[name=municipio]", '2');

    //   await page.click("button[type=submit]");

    //   await page.waitForSelector('#successAlert')

    // }, 9000000)

    // test('Finalizar an existing Caso correctly', async () => {

    //   //118 akin ze ingoeeeet¿



    //   await page.goto('http://localhost:3000/VerCaso/118');

    //   await page.click("button[name=finalizar]");

    //   const [button] = await page.$x("//button[contains(., 'Si, finalizar!')]");

    //   if(button) {
    //     await button.click()
    //   }

    // }, 9000000)

    // test('Delete an existing Caso correctly', async () => {

    //   await page.goto('http://localhost:3000/VerCaso/118');

    //   await page.click("button[name=eliminarCaso]");

    //   const [button] = await page.$x("//button[contains(., 'Si, eliminar!')]");

    //   if(button) {
    //     await button.click()
    //   }

    // }, 9000000)

  //     test('View all existing Casos correctly', async () => {
  //     await page.goto('http://localhost:3000/CasosNoFinalizados');

  //   }, 9000000)
  //   afterAll(async done => {
  //     browser.close()
  //     done();
  //   });
  // })

  // describe('Tests for Intervencion', () => {
  // let page;
  // beforeAll(async () => {
  //   let browser = await puppeteer.launch({
  //     headless: false
  //   });
  //   page = await browser.newPage();
  //   await page.goto('http://localhost:3000/LogIn');

  //   await page.click('input[name=email]')
  //   await page.type('input[name=email]', trabajador.email)
  //   await page.click('input[name=contraseña]')
  //   await page.type('input[name=contraseña]', trabajador.password)
  //   await page.click('button[type=submit]')

  //   await page.waitForSelector('#inputGender')

  // });

  // test('Creates a new Intervencion correctly', async () => {

  //   await page.goto('http://localhost:3000/VerCaso/119');

  //   await page.click("button[name=añadirIntervencion]");

  //   await page.click("input[name=nombre]");
  //   await page.type("input[name=nombre]", 'Nombre');
  //   await page.click("textarea[name=descripcion]");
  //   await page.type("textarea[name=descripcion]", 'Descripcion');

  //   await page.click("button[type=submit]");

  //   await page.waitForSelector('#successAlert')

  // }, 9000000)

  //   test('Updates an existing Intervencion correctly', async () => {
  //   await page.goto('http://localhost:3000/ActualizarIntervencion/41');

  //   await page.click("input[name=nombre]");
  //   await page.type("input[name=nombre]", '2');

  //   await page.click("button[type=submit]");

  //   await page.waitForSelector('#successAlert')

  // }, 9000000)

  // test('Deletes an existing Intervencion correctly', async () => {
  //   await page.goto('http://localhost:3000/ActualizarIntervencion/41');

  //     await page.click("button[name=eliminarIntervencion]");

  //     const [button] = await page.$x("//button[contains(., 'Si, eliminar!')]");

  //     if(button) {
  //       await button.click()
  //     }

  // }, 9000000)

  //   test('View all existing Intervencion correctly', async () => {
  //     await page.goto('http://localhost:3000/VerCaso/119');

  //     await page.click("button[name=verIntervencion]");

  // }, 9000000)
//   afterAll(async done => {
//     browser.close()
//     done();
//   });
// })

// describe('Tests for Sede', () => {
//   let page;
//   beforeAll(async () => {
//     let browser = await puppeteer.launch({
//       headless: false
//     });
//     page = await browser.newPage();
//     await page.goto('http://localhost:3000/LogIn');

//     await page.click('input[name=email]')
//     await page.type('input[name=email]', trabajador.email)
//     await page.click('input[name=contraseña]')
//     await page.type('input[name=contraseña]', trabajador.password)
//     await page.click('button[type=submit]')

//     await page.waitForSelector('#inputGender')

//   });

  // test('Creates a new Sede correctly', async () => {

  //   await page.goto('http://localhost:3000/CrearSede');

  //   await page.click("input[name=nombre]");
  //   await page.type("input[name=nombre]", 'Sede1');
  //   await page.click("input[name=localidad]");
  //   await page.type("input[name=localidad]", 'Localidad');

  //   await page.click("button[type=submit]");

  //   await page.waitForSelector('#successAlert')

  // }, 9000000)

  //   test('Updates an existing Sede correctly', async () => {
  //   await page.goto('http://localhost:3000/ActualizarSede/41');

  //   await page.click("input[name=nombre]");
  //   await page.type("input[name=nombre]", '2');

  //   await page.click("button[type=submit]");

  //   await page.waitForSelector('#successAlert')

  // }, 9000000)

//   test('Deletes an existing Sede correctly', async () => {
//     await page.goto('http://localhost:3000/ActualizarSede/4');

//       await page.click("button[name=eliminarSede]");

//       const [button] = await page.$x("//button[contains(., 'Si, eliminar!')]");

//       if(button) {
//         await button.click()
//       }

//   }, 9000000)

//     test('View all existing Sedes correctly', async () => {
//       await page.goto('http://localhost:3000/VerSedes');

//   }, 9000000)
//   afterAll(async done => {
//     browser.close()
//     done();
//   });
// })