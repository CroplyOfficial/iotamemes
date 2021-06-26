const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.static(path.join(__dirname, 'build')));

app.use('/uploads/*', createProxyMiddleware({target: 'http://localhost:5000', changeOrigin: true}));
app.use('/api/*', createProxyMiddleware({target: 'http://localhost:5000', changeOrigin: true}));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);
