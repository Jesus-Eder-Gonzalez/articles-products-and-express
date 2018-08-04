'use strict';

const express = require('express');
const app = express();

const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const logger = require('./middleware/logger');
const hiddenMethodParser = require('./helper/hiddenMethodParser');
const validation = require('./middleware/validation');
const products = require('./routes/products');
const articles = require('./routes/articles');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride((req, res) => {
  return hiddenMethodParser(req, res);
}));
app.use(logger);

app.use(validation);

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use('/products', products);
app.use('/articles', articles);

app.get('*', (req,res)=>{
  res.status(404).render('error');
});

app.listen(PORT, () => {
  process.stdout.write(`Server started on port: ${PORT}\n`);
});



