const request = require('request');

const opt = {
  jwt: "http://service-jwt:8989",
}

module.exports.getToken = function getToken() {
  return new Promise((resolve, reject) => {
    request(opt.jwt, (error, response, body) => {
      if (error) return reject(error);
      return resolve(`barrer ${JSON.parse(body).token}`);
    });
  });
};