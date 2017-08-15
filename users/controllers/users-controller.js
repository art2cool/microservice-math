const User = require('./../models/users.js');

function getUsers(req, res, next) {

  User
    .find({})
    .then((users) => {
      res.send({
        err: null,
        data: users
      })
    })
    .catch((err) => {
      res.send({ err, data: null })
    })
}

function getUserById(req, res, next) {
  const id = req.params.id;

  User
    .findById(id)
    .then((user) => {
      res.send({
        err: null,
        data: user
      })
    })
    .catch((err) => {
      res.send({ err, data: null })
    })
}

function createUser(req, res, next) {
  const body = req.body;
  const newUser = new User({
    email: body.email,
    password: body.password,
    emailToken: body.emailToken,
    expiredToken: body.expiredToken
  })
  newUser
    .save()
    .then((user) => {
      res.send({
        err: null,
        data: user
      })
    })
    .catch((err) => {
      res.send({ err, data: null })
    })
};

function removeUser(req, res, next) {
  const id = req.params.id;
  User
    .remove({ _id: id })
    .then((user) => {
      res.send({
        err: null,
        data: user
      })
    })
    .catch((err) => {
      res.send({ err, data: null })
    })
}
function updateUser(req, res, next) {
  const id = req.params.id;
  const body = req.body;

  User
    .findById(id)
    .then((user) => {
      user = Object.assign(user, body)
      return user.save()
    })
    .then((user) => {
      res.send({
        err: null,
        data: user
      })
    })
    .catch((err) => {
      res.send({ err, data: null })
    })
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  removeUser,
  updateUser
}