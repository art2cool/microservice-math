const express = require('express');
const request = require('request');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const opt = {
  jwt: "http://service-jwt:8989"
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', checkToken, require('./router/auth'));

app.listen(8228, () => {
  console.log('Auth listen on port 8228!');
});

//middleware
function checkToken(req, res, next) {
  const token = req.headers.auth;

  const options = {
    url: `${opt.jwt}/verify`,
    headers: {
      auth: `${token}`
    }
  };

  request(options, (error, response, body) => {
    if (response.statusCode === 401) {
      res.status(401).send({ msg: 'Forbiten' })
      return;
    }
    next();
  });
}