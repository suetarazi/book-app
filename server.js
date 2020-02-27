'use strict';

require('dotenv').config();
const express = require ('express');
const app = express();
require ('ejs');
const superagent = require('superagent');

const pg = require ('pg');
const client = new pg.Client(process.env.DATABASE_URL);

const methodOverride = require('method-override');

const PORT = process.env.PORT || 3001;

//Database setup
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

//Middleware = 'the train robber'
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
//allows me to change my 'post' to a 'put' in my HTML
app.use(methodOverride('_method'));


//Routes
// app.get('/index', renderHomePage);
app.get('/newSearch', newSearch);
app.get('/', renderHomePage);
app.post('/searches', collectFormData);
//display all books route:
app.get('/index', displayAllBooks);
// app.put('/books/:book_id', displayOneBook);
//may not need this call if displaySearchPage function is a duplicate of search form from yesterday. Need to research this!!!
app.get('/searches/new', displaySearchPage);
app.get('*', (request, response) => {
  response.status(404).send('error page not found');
});


//um, do we even need this function???
function displaySearchPage(request, response) {
    //display the search page
    response.render('./add-view.ejs'); 
    //check path of ./add-view.ejs - may not be right.

function renderHomePage(request, response) {
  response.render('./pages/index');
  console.log('hi');
}


function displayOneBook(request, response) {
    //get the params from the URL
    //go to the db with id - find the book
    //display the details
    let id = request.params.book_id;
    let sql = 'SELECT * FROM books WHERE id=$1;';
    let safeValues = [id];
    console.log(request.params.book_id);

    client.query(sql, safeValues)
    .then(results => {
        response.render('./pages/details.ejs', {bananas: results.rows})
    })

}

function displayAllBooks(request, response){
    let sql = 'SELECT * FROM books;';
    client.query(sql)
    .then (results => {
        console.log('show me sql')
        // console.log(results.rows)
           response.render('./pages/index.ejs', {sqlBooks: results.rows})
    })
    .catch(err => {
        console.error(err);
        response.status(500).send(err);
    })
}

// function renderHomePage(request, response) {
//     response.render('./pages/index.ejs');
// }

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

// turn on the server AND connect to the Database
client.connect()
    .then(() => {
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})
    });
