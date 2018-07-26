'use strict';

const http = require('http');
const app = require('./server');

const PORT = process.env.PORT || 8080;

http.createServer(app).listen(PORT, ()=> {
  process.stdout.write(`Server listening on port: ${PORT}`);
});