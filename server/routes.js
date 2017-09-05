const routes = require('express').Router();
const secret = require('./helpers/secret');
const { encrypt, decrypt } = require('./helpers/encrypt.js');

// server-side encryption using secret key (second-layer)
routes.post('/encryptTablet', (req, res) => {
  const encryptedTablet = encrypt(JSON.stringify(req.body.tablet), secret);
  res.send({ encryptedTablet });
});

routes.post('/decryptTablet', (req, res) => {
  let tablet = null;

  try {
    tablet = JSON.parse(decrypt(req.body.encryptedTablet, secret));
  } catch (e) {
    res.send({ message: 'Error: Message could not be decrypted' });
    return;
  }

  // do not return tablet if current time is past expiration date
  const now = new Date();
  const exp = new Date(tablet.expDate);
  if (exp < now) {
    res.send({ message: 'Error: Message has expired' });
  } else {
    res.send({ tablet });
  }
});

module.exports = routes;
