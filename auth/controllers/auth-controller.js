const axios = require('axios');
const { getToken } = require('./../service/send-request');

async function register(req, res, next) {
  const { email, password } = req.body;
  const emailToken = 'bla-bla';
  const expiredToken = new Date(+new Date() + 1000 * 60 * 5);
  const form = { email, password, emailToken, expiredToken };
  const token = await getToken();

  axios({
    method: 'post',
    url: 'http://users-api:8001/',
    data: form,
    headers: {
      auth: `${token}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    })
}

module.exports = {
  register,
}