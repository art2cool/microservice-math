const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')

const secret = 'tshhhhh....';

app.get('/', (req, res) => {
	const token = jwt.sign({ servicename: 'test' }, secret, {expiresIn: 1});
	res.send({token});
});

app.get('/verify', (req, res) => {
	const token = req.query.token;
	try {
        var decoded = jwt.verify(token, secret);
        res.status(200).send('ok')
    } catch(err) {
        res.status(401).send(err)
    }
});

app.listen(8989, () => {
	console.log('JWT token port 8989!');
});