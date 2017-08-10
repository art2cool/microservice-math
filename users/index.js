const express = require('express');
const querystring = require('querystring');
const request = require('request');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/ms_test', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected');
    }
});

const opt = {
  jwt: "http://service-jwt:8989"
}

app.get('/',checkToken, (req, res) => {
  res.send({ msg: 'users are here' });
});

app.listen(8001, () => {
  console.log('Users listen on port 8001!');
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