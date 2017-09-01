const ursa = require('ursa');
const crypto = require('crypto');

const lolwut = ursa.generatePrivateKey();

const algo = 'aes-256-ctr';
const password = 'uAkk2';

function encrypt(text) {
  const cipher = crypto.createCipher(algo, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

const wewlad = encrypt('the waving wheat sure smells sweet when the wind comes right behind the rain');
console.log(wewlad);

const doubleEncrypt = lolwut.encrypt(wewlad, 'hex', 'base64');

console.log(doubleEncrypt);

const step1 = lolwut.decrypt(doubleEncrypt, 'base64', 'hex');

console.log(step1);

function decrypt(crypted) {
  const decipher = crypto.createDecipher(algo,password);
  let text = decipher.update(crypted, 'hex', 'utf8');
  text += decipher.final('utf8');
  return text;
}

const decrypted = decrypt(step1);

console.log(decrypted);
