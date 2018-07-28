'use strict';

const express = require('express');
const methodOverride = require('method-override');

const products = require('./routes/products');
const articles = require('./routes/articles');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/products', products);
app.use('/articles', articles);

app.listen(PORT, () => {
  process.stdout.write(`Server started on port: ${PORT}\n`);
});