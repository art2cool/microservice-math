const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

http.createServer(function (req, res) {
  proxy.web(req, res, { target: 'http://api-gateway:8000' });
}).listen(3000);