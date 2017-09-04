const routes = require('express').Router();
const secret = require('./helpers/secret');
let { encrypt, decrypt } = require('./helpers/encrypt.js');

// server-side encryption using secret key (second-layer)
routes.post('/encryptTablet', (req, res) => {
  const encryptedTablet = encrypt(JSON.stringify(req.body.tablet), secret);
  res.send(encryptedTablet);
});

routes.post('/decryptTablet', (req, res) => {
  const tablet = JSON.parse(decrypt(req.body.encryptedTablet, secret));
  res.send(tablet);
});

module.exports = routes;
