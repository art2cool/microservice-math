const express = require('express');
const app = express();
const httpProxy = require('express-http-proxy');
const request = require('request');

const opt = {
  sum: "http://math-sum:8081",
  random: "http://math-random:8082",
  jwt: "http://service-jwt:8989",
  users: "http://users-api:8989",
}

const proxyUsers = httpProxy('http://users-api:8001');
const proxyMath = httpProxy('http://math-router:8080');

app.use('/math', getToken, (req, res, next) => {
  proxyMath(req, res, next)
});

app.use('/users', getToken, (req, res, next) => {
  proxyUsers(req, res, next)
});

app.listen(8000, () => {
  console.log('Api gateway listen on port 8000')
});

function getToken(req, res, next) {
  request(opt.jwt, (error, response, body) => {

    if (error) return console.log(error);
    req.headers.auth = `barrer ${JSON.parse(body).token}`
    next()
  });
}