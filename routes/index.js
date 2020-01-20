const express = require('express');
const router = express.Router();


const crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = 'd6F3Efeq';

function encrypt(text){
  const cipher = crypto.createCipher(algorithm,password)
  let crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  const decipher = crypto.createDecipher(algorithm,password)
  let dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { encrypted: '', decrypted: '' });
});

/* POST */
router.post('/decrypt', function(req, res, next) {
  let result = req.body.messageToDecrypt;
  result = result ? decrypt(req.body.messageToDecrypt) : '';
  res.render('index', { encrypted: '', decrypted: result });
});


/* POST  */
router.post('/encrypt', function(req, res, next) {
  let result = req.body.messageToEncrypt;
  result = result ? encrypt(req.body.messageToEncrypt) : '';
  res.render('index', { encrypted: result, decrypted: '' });
});

module.exports = router;


