const puppeteer = require("puppeteer");

async function scrapeProduct(productString, pageNumber) {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  const url = "https://aliexpress.ru/wholesale?SearchText=" + productString + "&g=y&page=" + pageNumber; 
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  let productNames = [];
  let productPrices = [];
  let productSellings = [];
  let productRatings = [];
  for (let productId = 0; productId <= pageNumber * 16; ++productId) {
    let doc2 = await page.$$('[data-index="' + productId + '"]');
    for (let i = 0; i < doc2.length; ++i) {
      let x = doc2[i];
      let name = await x.$eval('.product-snippet_ProductSnippet__name__lido9p', element => element.textContent);
      let price = await x.$eval('.snow-price_SnowPrice__mainM__18x8np', element => element.textContent);
      try {
        let selling = await x.$eval('.product-snippet_ProductSnippet__sold__lido9p', element => element.textContent);
        productSellings.push(makeFloat(selling));
      } catch(err) {
        productSellings.push(null);
      }
      try {
        let rating = await x.$eval('.product-snippet_ProductSnippet__score__lido9p', element => element.textContent);
        productRatings.push(makeFloat(rating));
      } catch(err) {
        productRatings.push(null);
      }
      productNames.push(name);
      productPrices.push(makeFloat(price));
    }
  }
  
  let products = [];
  for (let i = 0; i < pageNumber * 16; ++i) {
    let product = [productNames[i], productPrices[i], productSellings[i], productRatings[i]];
    products.push(product);
  }

  browser.close();

  return products;
}

function makeFloat(str) {
  let newStr = "";
  for (let i = 0; i < str.length; ++i) {
    if (str[i] == ' ') continue;  
    if (str[i] == ',') { newStr += '.'; continue; } 
    if ('0' <= str[i] && str[i] <= '9') {
      newStr += str[i];
    }
  }
  return parseFloat(newStr);
}

module.exports = scrapeProduct;