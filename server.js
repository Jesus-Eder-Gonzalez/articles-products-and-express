'use strict';

const express = require('express');
const products = require('./routes/products');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/products', products);
// app.get('/', (req, res) => {
//   const locals = {
//     greeting: 'Aloha',
//     title: 'DevLeague',
//     collection: ['puffins',
//       'penguins',
//       'pigeons',
//       'flying fish'],
//       showContent: true
//   };
//   res.render('home', locals);
// });
app.listen(PORT, () => {
  process.stdout.write(`Server started on port: ${PORT}\n`);
});