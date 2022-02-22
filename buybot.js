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
  await page.waitFor(3500);
  await page.type("input[id='fld-e'", 'diciac@aol.com', {delay: 200});
  await page.type("input[id='fld-p1'", 'big@baller', {delay: 200});
  await page.evaluate(() =>
    document
      .getElementsByClassName(
        'c-button c-button-secondary c-button-lg c-button-block c-button-icon c-button-icon-leading cia-form__controls__submit '
      )[0]
      .click()
  );
}
async function checkout() {
  const page = await loadBrowser();
  await addToCart(page);
  // await inputInfo(page);
  // await creditCard(page);
}

checkout();
