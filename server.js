'use strict';

require('dotenv').config();
const express = require ('express');
const app = express();
require ('ejs');
const superagent = require('superagent');

const PORT = process.env.PORT || 3001;

//tells express to use ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true,}));
app.use(express.static('./public'));

app.get('/', renderHomePage);
app.get('/newSearch', newSearch);
app.post('/searches', collectFormData);


function renderHomePage(request, response) {
    response.render('./pages/index.ejs');
}

function newSearch(request, response){
    response.render('./searches/new.ejs');
  }

function collectFormData(request, response){
    let formData = request.body.search;
    let nameOfBookOrAuthor = formData[0];
    let isTitleOrAuthor = formData[1];
    let url = `https://www.googleapis.com/books/v1/volumes?q=`;

    if(isTitleOrAuthor === 'title'){
        url += `+intitle:${nameOfBookOrAuthor}`;
    } else if (isTitleOrAuthor === 'author'){
        url += `+inauthor:${isTitleOrAuthor}`;
    }


    superagent.get(url)
        .then(results => {
            let resultsArray = results.body.items;
            const finalArray = resultsArray.map(book => {
                new Book(book.volumeInfo);
            })
            response.status(200).render('./show.ejs', {bananas: finalArray});
        })
        .catch(err => {
            console.error(err);
            response.status(500).send(err);
        })
}

function Book(obj) {
    this.title = obj.title || 'no title available';
    this.author = obj.author || 'no author available';
    this.image_url = obj.image_url || 'https://i.imgur.com/J5LVHEL.jpg';
    this.description = obj.description; 

app.get('/', (request, response) => {
  // console.log('i am on!');
  response.render('./pages/index.ejs');
  // response.send('hello');
});
app.get('/newSearch', newSearch);

function newSearch(request, response){
  response.render('./searches/new.ejs');

}

// turn on the server
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
