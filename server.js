'use strict';

require('dotenv').config();
const express = require ('express');
const app = express();
require ('ejs');
const superagent = require('superagent');

const PORT = process.env.PORT || 3001;
//tells express to use ejs
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true,}));


app.get('/', renderHomePage);
app.post('/searches', collectFormData);
app.get('/newSearch', newSearch);


function renderHomePage(request, response) {
  response.render('pages/index');
  console.log('hi');
}

function newSearch(request, response){
  response.render('pages/searches/new');
}

function collectFormData(request, response){
  let formData = request.body.search;
  let nameOfBookOrAuthor = formData[0];
  let isTitleOrAuthor = formData[1];
  let url = `https://www.googleapis.com/books/v1/volumes?q=`;

  if(isTitleOrAuthor === 'title'){
    url += `+intitle:${nameOfBookOrAuthor}`;
  } else if (isTitleOrAuthor === 'author'){
    url += `+inauthor:${nameOfBookOrAuthor}`;
  }

  superagent.get(url)
    .then(results => {
      let resultsArray = results.body.items;
      const finalArray = resultsArray.map(book => {
        return new Book(book.volumeInfo);
      });
      response.status(200).render('./searches/show.ejs', {bookArryay: finalArray});
    })
    .catch(err => {
      console.error(err);
      response.status(500).send(err);
    });
}

function Book(obj) {
  this.title = obj.title || 'no title available';
  this.author = obj.author || 'no author available';
  this.image_url = obj.image_url || 'https://i.imgur.com/J5LVHEL.jpg';
  this.description = obj.description;
}

// turn on the server
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
