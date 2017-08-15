const express = require('express');
const app = express();
const httpProxy = require('express-http-proxy');
const request = require('request');

const opt = {
  jwt: "http://service-jwt:8989",
}

app.use('/math', getToken, httpProxy('http://math-router:8080'));
app.use('/users', getToken, httpProxy('http://users-api:8001'));
app.use('/auth', getToken, httpProxy('http://auth-api:8228'));

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