const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

http.createServer(function (req, res) {
  proxy.web(req, res, { target: 'http://math-router:8080' });
}).listen(3000);