'use strict';

require('dotenv').config();
const express = require ('express');
const app = express();
require ('ejs');
const superagent = require('superagent');

const PORT = process.env.PORT || 3001;

//tells express to use ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/', (request, response) => {
    // console.log('i am on!');
    response.render('./pages/index.ejs');
    // response.send('hello');
})


// turn on the server
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})
