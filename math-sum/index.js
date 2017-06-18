const express = require('express');
const querystring = require('querystring');
const request = require('request');

const app = express();

const opt = {
	sum: "http://math-sum:8081",
	random: "http://math-random:8082",
	jwt: "http://service-jwt:8989"
}

app.get('/', checkToken, (req, res) => {
	const {left, right, operation} = req.query
	const num = parseInt(right,10) + parseInt(left,10)
	res.send({answer: num});
});

app.listen(8081, () => {
	console.log('Sum on port 8081!');
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
