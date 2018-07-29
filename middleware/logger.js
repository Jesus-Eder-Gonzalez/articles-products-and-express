const fs = require('fs');

const logger = function (req, res, next) {
  let now = new Date();
  let logPath = `./logs/${now.getFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}.log`;
  let logEntry = `${req.method} ${req.path} ${now}\n`;
  fs.appendFile(logPath, logEntry, (err) => {
    err ? console.log(err) : '';
  });
  return next();
}

module.exports = logger;