const crypto = require('crypto');

const algo = 'aes-256-ctr';
const password = 'uAkk2';

export function encrypt(text) {
  const cipher = crypto.createCipher(algo, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function decrypt(crypted) {
  const decipher = crypto.createDecipher(algo, password);
  let text = decipher.update(crypted, 'hex', 'utf8');
  text += decipher.final('utf8');
  return text;
}
