const crypto = require('crypto');

const algo = 'aes-256-ctr';

function encrypt(text, password) {
  const cipher = crypto.createCipher(algo, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(crypted, password) {
  const decipher = crypto.createDecipher(algo, password);
  let text = decipher.update(crypted, 'hex', 'utf8');
  text += decipher.final('utf8');
  return text;
}

module.exports = { encrypt, decrypt };
