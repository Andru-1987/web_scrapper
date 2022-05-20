const {connector} = require('./mongo_connector');

const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const PORT = 3000 || process.env.PORT;

let URL = 'https://listado.mercadolibre.com.ar/notebook#D[A:notebook]'

axios(URL)
.then( (resp) => {
    let html =  resp.data;

    const $ = cheerio.load(html);

    let name = '.ui-search-layout__item';

    let items = [];

    $(name,html).each((i,element)=>{
        let item = {}
        item.titulo = $('.ui-search-item__title',element).text();
        item.link = $('a',element).attr('href');
        let regex_precio = /(\d+)/g;

        item.precio = parseFloat(
            $('.price-tag-text-sr-only',element).text().match(regex_precio));
        items.push(item);

    });

    connector(items);

    let json_data = JSON.stringify(items);

})
.catch( e => console.log(e))

app.listen(
    PORT,
    () => console.log(`Server is running on port ${PORT}`)
);

