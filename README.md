# AliExpressWebScrapper

This is web scrapper for scrapping search requests from AliExpress.

## Below are listed requests that you can make:

| Reques Type        | Path           | Description  | Body | 
| ------------- |:-------------:| -----:| -----:|
| GET      | /api/products/ | List all products in the DB | not required |
| GET | /api/products/findByPrice | List all products greater than some price | required "price" for the price of the product |
| POST | /api/products/ | Make Search Query in AliExpress and store results in DB| required "name" for the name of the product and "page" for the page number |
| PUT | /api/products/ | Updating entry by Id | required "body" (model of the product) and id | 
| DELETE | /api/products/      | Delete all entries in DB | not required | 
