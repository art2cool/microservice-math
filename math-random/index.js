const express = require('express');
const querystring = require('querystring');
const request = require('request');
const app = express();

const opt = {
	sum: "http://localhost:8081",
	random: "http://localhost:8082",
	jwt: "http://localhost:8989"
}

app.get('/', checkToken, (req, res) => {
	const {left, right, operation} = req.query
	const num = Math.floor(Math.random()*(parseInt(right,10) - parseInt(left,10)) + parseInt(left,10))
	res.send({answer: num});
});


app.listen(8082, () => {
	console.log('Math random on port 8082!');
});

//middleware
function checkToken(req, res, next) {
	const token = req.query.token;
	const query = querystring.stringify({ token })
	request(`${opt.jwt}/verify?${query}`, (error, response, body) => {
		if (response.statusCode === 401) {
			res.status(401).send({msg: 'Forbiten'})
		return;
		}
		next();		
	});
}