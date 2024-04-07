const express = require('express');
const app = express()
const axios = require('axios')
const NewAdmin = require("../models/NewAdmin.js");

const port = 5000
const failedWebhook = 'https://discord.com/api/webhooks/1170168780203229254/c4_f7SpbS2JrV-SRmG5VuwasEYqK6bNj-8mNzcsH-J8WcCp2FLRuhyz_R_NsBpsB7nXq'

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 75, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

encryptionTable = {
   'a': 'GHJqdwwzX',
   'b': 'JHqwsxDdd',
   'c': 'YqwxhnqwdS',
   'd': 'YUqwjnasdas',
   'e': 'jgasww',
   'f': 'Gytqxhf',
   'g': 'TYqweusxxzZ',
   'h': 'Yswwsxxx',
   'i': 'GJhktsxDWw',
   'j': 'Xdqwetx',
   'k': 'FwwswwwqQxxII',
   'l': 'UYTxwtrXXXQSDD',
   'm': 'pLMWddsadasrty',
   'n': 'GgqsahTsssS',
   'o': 'Bnmszasdasxc',
   'p': 'DSAhasdasdxqw',
   'q': 'Nqwdqwdqw',
   'r': 'kJjwqdsxxxsqwq',
   's': 'Yqwdqwdqw',
   't': 'DHswpoosorx',
   'u': 'HqqwezxaS',
   'v': 'Jsdadtgqwds',
   'w': 'YqwqwdKMgews',
   'x': 'QetsfFQwjkqsrqw',
   'y': 'sqwdfqwdwqdqw',
   'z': 'eutsjnhdwshc',
   '0': 'Dqwdqwsadsahg',
   '1': 'sfasdqwdDs',
   '2': 'bscxxznfadsadD',
   '3': 'HJasdqwhgqwdS',
   '4': 'Klkssdszxa',
   '5': 'SenBanaHaramsinKabulOlmazKanarsinSenAsla',
   '6': 'sdasdasdastWEwswWW',
   '7': 'AteslereKulOlurYanaarim',
   '8': 'HaramsinnnnKabulOlmazIflaOlmassinSenasla',
   '9': 'anarimYanarimAteslereYururumYanarimKulOlurum',
 }
 
 decryptionTable = {
   'GHJqdwwzX': 'a',
   'JHqwsxDdd': 'b',
   'YqwxhnqwdS': 'c',
   'YUqwjnasdas': 'd',
   'jgasww': 'e',
   'Gytqxhf': 'f',
   'TYqweusxxzZ': 'g',
   'Yswwsxxx': 'h',
   'GJhktsxDWw': 'i',
   'Xdqwetx': 'j',
   'FwwswwwqQxxII': 'k',
   'UYTxwtrXXXQSDD': 'l',
   'pLMWddsadasrty': 'm',
   'GgqsahTsssS': 'n',
   'Bnmszasdasxc': 'o',
   'DSAhasdasdxqw': 'p',
   'Nqwdqwdqw': 'q',
   'kJjwqdsxxxsqwq': 'r',
   'Yqwdqwdqw': 's',
   'DHswpoosorx': 't',
   'HqqwezxaS': 'u',
   'Jsdadtgqwds': 'v',
   'YqwqwdKMgews': 'w',
   'QetsfFQwjkqsrqw': 'x',
   'sqwdfqwdwqdqw': 'y',
   'eutsjnhdwshc': 'z',
   'Dqwdqwsadsahg': '0',
   'sfasdqwdDs': '1',
   'bscxxznfadsadD': '2',
   'HJasdqwhgqwdS': '3',
   'Klkssdszxa': '4',
   'SenBanaHaramsinKabulOlmazKanarsinSenAsla': '5',
   'sdasdasdastWEwswWW': '6',
   'AteslereKulOlurYanaarim': '7',
   'HaramsinnnnKabulOlmazIflaOlmassinSenasla': '8',
   'anarimYanarimAteslereYururumYanarimKulOlurum': '9',
 }
 
function deobfuscateStr(str) {
  var deobfuscatedStr = '';
  var i = 0;
  while (i < str.length) {
    var found = false;
    for (var key in decryptionTable) {
      if (str.startsWith(key, i)) {
        deobfuscatedStr += decryptionTable[key];
        i += key.length;
        found = true;
        break;
      }
    }
    if (!found) {
      deobfuscatedStr += str.charAt(i);
      i++;
    }
  }
  return deobfuscatedStr;
}
 
function obfuscateStr(str) {
  let encrypted = "";
  for (let char of str) {
      if (encryptionTable[char]) {
          encrypted += encryptionTable[char];
      } else {
          encrypted += char;
      }
  }
  return encrypted;
}

const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION, () => {
  console.log("connection to mongodb finished");
});

const autheds = {
  ['83.251.50.65']: true,
}

//   Customer.find({ server_customer: id }, function (err, obj) {

app.get('/ss', async (req, res) => {
  const userip = req.headers["x-real-ip"] || req.socket.remoteAddress || 'Null-IpAdres';
  const randomNumber = req.query.randomNumber;

  const deobfusactedRandomNumber = deobfuscateStr(randomNumber);
  const successString = obfuscateStr('success-'+deobfusactedRandomNumber)
  //  sendwebhook();
   //  Customer.find({ userHwid: deobfuscatedHwid, userMcAdress: deobfuscatedmcAdress }, function (err, customers) {
  //   if (err) {
  //     console.error("Veritabanı hatası:", err);
  //     return res.status(500).send("Veritabanı hatası oluştu");
  //   }
  if (autheds[userip]) {
    res.send(successString)
  } else {
    res.send('error occuptured')
  }
  
  //   if (customers.length === 0) {
  //     res.send('stopit');
  //   } else {
  //     res.send(obfuscateStr(deobfuscatedHwid)+successString)
  //   }

  //  })
})

app.listen(port, () => {
   console.log(`Server ${port} portundan başlatıldı!`)
})