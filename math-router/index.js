const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const querystring = require('querystring');

const opt = {
  sum: "http://math-sum:8081",
  random: "http://math-random:8082",
  jwt: "http://service-jwt:8989",
  users: "http://users-api:8989",
}

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', checkToken, getToken, (req, res) => {
  const { left, right, operation } = req.query;
  const token = req.token;
  const query = querystring.stringify({ left, right});

  const options = {
    url: `${opt[operation]}?${query}`,
    headers: {
      auth: `Barrer ${token}`
    }
  };

  request(options, (error, response, body) => {
    res.send(body);
  });
});

function getToken(req, res, next) {
  request(opt.jwt, (error, response, body) => {

    if (error) return console.log(error);
    req.token = JSON.parse(body).token
    next()
  });
}

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

app.listen(8080, () => {
  console.log('Math router linstening on port 8080!');
});