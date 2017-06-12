const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const querystring = require('querystring');

const opt = {
	sum: "http://localhost:8081",
	random: "http://localhost:8082",
	jwt: "http://localhost:8989"
}

app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/", (req, res) => {
// 	res.send('pong')
// })

app.get('/math', getToken, (req, res) => {
	const {left, right, operation} = req.query;
	const token = req.token;
	const query = querystring.stringify({ left, right, token });
	
	request(`${opt[operation]}?${query}`, (error, response, body) => {

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

app.listen(8080, () => {
	console.log('Math router linstening on port 8080!');
});