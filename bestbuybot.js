const puppeteer = require('puppeteer');

const ran_url =
  'https://www.bestbuy.com/site/acer-nitro-5-gaming-laptop-15-6-fhd-144hz-intel-11th-gen-i7-geforce-rtx-3050ti-16gb-ddr4-512gb-ssd-windows-11/6486189.p?skuId=6486189';

async function loadBrowser() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(ran_url);
  return page;
}
async function addToCart(page) {
  await page.waitFor(2000);
  await page.evaluate(() =>
    document
      .getElementsByClassName(
        'c-button c-button-primary c-button-lg c-button-block c-button-icon c-button-icon-leading add-to-cart-button'
      )[0]
      .click()
  );

  await page.evaluate(() =>
    document.getElementsByClassName('cart-label')[0].click()
  );
  await page.waitFor(3500);
  await page.evaluate(() =>
    document
      .getElementsByClassName('btn btn-lg btn-block btn-primary')[0]
      .click()
  );
  await page.waitFor(5000);
  await page.evaluate(() =>
    document
      .getElementsByClassName(
        'c-button c-button-secondary c-button-lg cia-guest-content__continue guest'
      )[0]
      .click()
  );
}

async function inputInfo(page) {
  await page.waitFor(4000);
  await page.type("input[id='firstName'", 'Micheal', {delay: 200});
  await page.type("input[id='lastName'", 'Poped', {delay: 200});
  await page.type("input[id='street'", '5063 chatsworth', {delay: 100});
  await page.type("input[id='city'", 'oTledo', {delay: 100});
  const input = await page.$('#state');
  await input.click({clickCount: 3});
  await input.type('OH');
  await page.type("input[id='zipcode'", '43615', {delay: 10});
  await page.type("input[id='user.emailAddress'", 'bigballer2523@gmail.com', {
    delay: 100
  });
  await page.type("input[id='user.phone'", '4195522525', {delay: 10});
  await page.waitFor(4000);
}

async function creditCard(page) {
  await page.evaluate(() =>
    document.getElementsByClassName('c-radio-input')[0].click()
  );

  await page.waitFor(6000);
  // try to get the path done so double button doesnt have to be clicked
  await page.evaluate(() =>
    document
      .getElementsByClassName('btn btn-lg btn-block btn-secondary')[0]
      .click()
  );
  await page.waitFor(6000);
  await page.type("input[id='optimized-cc-card-number'", '	4263982640269299', {
    delay: 100
  });

  await page.select("select[name='expiration-month'", '02');
  await page.select("select[name='expiration-year'", '2023');
  await page.type("input[id='credit-card-cvv'", '	837', {
    delay: 100
  });
  await page.waitFor(4000);
  await page.evaluate(() =>
    document
      .getElementsByClassName('btn btn-lg btn-block btn-primary')[0]
      .click()
  );
  await page.waitFor(4000);
}

async function checkout() {
  const page = await loadBrowser();
  await addToCart(page);
  await inputInfo(page);
  await creditCard(page);
}

checkout();
