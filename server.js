'use strict';

require('dotenv').config();
const express = require ('express');
const app = express();
require ('ejs');
const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3001;
//tells express to use ejs
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true,}));

app.get('/', renderHomePage);
app.post('/searches', collectFormData);
app.get('*', (request, response) => {
  response.status(404).send('error page not found');
});

function renderHomePage(request, response) {
  response.render('pages/index');
  console.log('hi');
}

function newSearch(request, response){
  response.render('pages/searches/new');
}

// function showBooks(request, response){
//     // don't I need to call collectFormData or something and then push info constructor function to show.ejs?
//     response.render('/searches/show.ejs');
// }
function collectFormData(request, response){
  let formData = request.body.search;
  let nameOfBookOrAuthor = formData[0];
  let isTitleOrAuthor = formData[1];
  let url = `https://www.googleapis.com/books/v1/volumes?q=`;
  console.log('function is running');
  if(isTitleOrAuthor === 'title'){
    url += `+intitle:${nameOfBookOrAuthor}`;
  } else if (isTitleOrAuthor === 'author'){
    url += `+inauthor:${isTitleOrAuthor}`;
  }


  superagent.get(url)
    .then(results => {
      let resultsArray = results.body.items;
      const bookArray = resultsArray.map(book => {
        return new Book(book.volumeInfo);
        // console.log(testBook);
      });
      console.log(bookArray);
      response.status(200).render('./searches/show.ejs', {obj: bookArray,});
    })
    .catch(err => {
      console.error(err);
      response.status(500).send(err);
    });
}

//constructor function
function Book(obj) {
  this.title = obj.title || 'no title available';
  this.authors = obj.authors || 'no author available';
  this.image_url = obj.imageLinks.thumbnail ? obj.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
  this.description = obj.description || 'no description available';

}

// turn on the server
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
