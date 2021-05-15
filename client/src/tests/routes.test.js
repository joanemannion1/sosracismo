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

describe('Login', () => {
  test('users can login', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    await page.goto(routes.public.login);
    await page.waitForSelector('.form-signin');

    await page.click('input[name=email]')
    await page.type('input[name=email]', trabajador.email)
    await page.click('input[name=contraseña]')
    await page.type('input[name=contraseña]', trabajador.password)
    await page.click('button[type=submit]')
    // await page.waitForSelector('[data-testid="homepage"]')
  }, 1600000);
});

describe('Create trabajador', () => {
  test('Sends form correctly', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    await page.goto('http://localhost:3000/LogIn');

    await page.click('input[name=email]')
    await page.type('input[name=email]', trabajador.email)
    await page.click('input[name=contraseña]')
    await page.type('input[name=contraseña]', trabajador.password)
    await page.click('button[type=submit]')

    await page.goto('http://localhost:3000/CrearTrabajador');

    await page.click("input[name=nombre]");
    await page.type("input[name=nombre]", newTrabajador.name);
    await page.click("input[name=email]");
    await page.type("input[name=email]", newTrabajador.email);
    await page.click("input[type=checkbox]");
    await page.select('select[name="sede"]', '1');

    await page.click("button[type=submit]");

    browser.close();

  },9000000)
})