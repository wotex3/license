const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Customer = require("./models/newCustomer.js");

const path = require('path');
const axios = require('axios');

const PORT = 4000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 85, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)
app.use(bodyParser.json());

// URL kodu çözülmüş form verilerini işlemek için bodyParser kullan
app.use(bodyParser.urlencoded({ extended: true }));

const apiKeys = {
  ['DWAZqDyR0F8SzdcBlti2']: true,
  ['bbbb']: true,
}

const cfxURL = 'https://status.cfx.re/api/v2/status.json'
let cfxReIsActive = false;
mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://wht3636:Berkberk2002@cluster0.l7zokyy.mongodb.net/', () => {
  console.log("connection to mongodb finished");
});

app.get('/auth', async (req, res) => {
  // const userip = '83.248.181.96'
  const userip = req.headers["x-real-ip"] || req.socket.remoteAddress || 'Null-IpAdres';
  if (req.body === undefined || req.body === null) { 
    res.send('DUNYA GUL BANA')
    return;          
  }     
  const bodyKeys = Object.keys(req.body);
  const numElements = bodyKeys.length;
  if (numElements != 14) {
    res.send('YAPMA OLM YAPMA ANANI') 
    return 
  }
  if (!req.body.gkbquwgs) {
    res.send('YAPMA OLM')
    return
  }
  const key = req.body.gkbquwgs;
  const deKey = deobfuscateStr(key);
  const successString = obfuscateStr('success-'+deKey)
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      let deb = req.body[key] = deobfuscateStr(req.body[key]);
      req.body[key] = obfuscateStr('success-'+deb)
    }
  }
  Customer.find({ ip: userip }, function (err, customers) {
    if (err) {
      console.error("Veritabanı hatası:", err);
      return res.status(500).send("An sql error occurred");
    }
    
    if (customers.length === 0) {
      res.send('Unauthorized')
    } else {
      const isExpired = customers[0].date < new Date().toISOString().split('T')[0]
      if (isExpired == true) {
        Customer.findOneAndDelete(
          { ip: userip },
        )
        .then(() => {
          res.send('Expired')
        }).catch((err) => res.send('333'));
      } else {
        console.log(req.body)
        res.send(req.body)
      }
    }
  })
})

app.get('/', async (req, res) => {
  res.render('index')
});

app.post('/changeIp', (req, res) => {
  const { ipToChange, newIp } = req.body;
  Customer.findOneAndUpdate(
    { ip: ipToChange },
    { ip: newIp }
  )
  .then(() => {
    Customer.find({}, function (err, obj) {
      res.status(200).json({ message: 'IP adresi başarıyla değiştirildi!', data: obj })
    })
  }).catch((err) => res.status(331).send(err));
});

app.post('/changeNote', (req, res) => {
  const { ip, newNote } = req.body;
  Customer.findOneAndUpdate(
    { ip: ip },
    { user_note: newNote }
  )
  .then(() => {
    Customer.find({}, function (err, obj) {
      res.status(200).json({ message: 'Kullanici notu basariyla degistirildi!', data: obj })
    })
  }).catch((err) => res.status(331).send(err));
});

app.post('/changeDate', (req, res) => {
  const { ip, date } = req.body;
  Customer.findOneAndUpdate(
    { ip: ip },
    { date: date }
  )
  .then(() => {
    Customer.find({}, function (err, obj) {
      res.status(200).json({ message: 'Kullanici tarihi basariyla degistirildi!', data: obj })
    })
  }).catch((err) => res.status(331).send(err));
});

app.post('/createLicense', (req, res) => {
  const { ip, note, date } = req.body;
  const newCustomer = new Customer({
    ip: ip,
    user_note: note,
    date: date,
  });
  newCustomer
  .save()
  .then(() => {
    Customer.find({}, function (err, obj) {
      res.status(200).json({ message: 'Lisans basariyla olusturuldu', data: obj })
    })
  }).catch((err) => res.status(331).send(err));
});

app.post('/removeLicense', (req, res) => {
  const { ip } = req.body;
  Customer.findOneAndDelete(
    { ip: ip },
  )
  .then(() => {
    Customer.find({}, function (err, obj) {
      res.status(200).json({ message: 'Basariyla lisans silindi!', data: obj })
    })
  }).catch((err) => res.status(331).send(err));
});

app.post('/submit', async (req, res) => {
  const userInput = req.body.inputValue;
  if (apiKeys[userInput]) {
      const obj = await Customer.find({});
      try {
        cfxReIsActive = true;
        const response = await axios.get(cfxURL);
        if (response.status === 200) {
          // console.log(response.data.status.description)
          if (response.data.status.description != 'All Systems Operational') {
            cfxReIsActive = false;
          }
        }
        res.render('secondLayout', { data: obj, statusCfx: cfxReIsActive }); 
      } catch (err) {
        res.redirect('/');
        throw err;
      }
    } else {
    res.redirect('/');
  }
});

function generateRandomData() {
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push(Math.floor(Math.random() * 100));
    }
    return data;
}

encryptionTable = {
  'a': 'GHJqdwwzXGasdqwqwsq',
  'b': 'JHqwsxfaXsdasDdd',
  'c': 'YqwxhqyhwsdasdsadsanqwdS',
  'd': 'YUqwjnhasdasdas',
  'e': 'jgsadasdsaasww',
  'f': 'Gytqfasdasdsaxhf',
  'g': 'TYqweusxxzZ',
  'h': 'Yswwsasdsadsaxxx',
  'i': 'GJhktsxDWw',
  'j': 'Xdqasdasdaswetx',
  'k': 'FwwswwwqQxxII',
  'l': 'UYTxwtrXXXQSDD',
  'm': 'pLMWddsadasrty',
  'n': 'GgqsahTsssS',
  'o': 'Bnmszasdasxc',
  'p': 'DSAhasdasdxqw',
  'q': 'Nqwdqwdqw',
  'r': 'kJjwqdsxxxsqwq',
  's': 'qwdqQ!as=)%/hdGsasdaswdqw',
  't': 'DHswpoosorx',
  'u': 'jh?q!!qw%we)zGxaS',
  'v': 'Jsdadtgqwds',
  'w': 'YqwqwdKMgews',
  'x': 'QetsfFQwjkqsrqw',
  'y': 'sqwdfqwdwqdqw',
  'z': 'eutsjnhdwshc',
  '0': 'Dqwdqwsadsahg',
  '1': 'sfasdqwdDs',
  '2': 'bscxxznfadsadD',
  '3': 'HJasdwqdqqwhgqwdS',
  '4': 'Klkssjkqwdajhdszxa',
  '5': 'SxXessnBasdasanaHagfqmsinKjbuasdlOlmazKaGsadqnarsiesESenAsjda',
  '6': 'sdasdasdastWEwswWW',
  '7': 'AteSxddslereKuhasdsalOlYHsqurYanaarim',
  '8': 'HsadaramsinjwnnnKabulOlmaaszIflaOlmadsassinSenasadsla',
  '9': 'anarimyaxanarimyseslereYssdhuururulesjhnariqadqyylurum',
}


decryptionTable = {
  'GHJqdwwzXGasdqwqwsq':  'a',
  'JHqwsxfaXsdasDdd':  'b',
  'YqwxhqyhwsdasdsadsanqwdS':  'c',
  'YUqwjnhasdasdas':  'd',
  'jgsadasdsaasww':  'e',
  'Gytqfasdasdsaxhf':  'f',
  'TYqweusxxzZ':  'g',
  'Yswwsasdsadsaxxx':  'h',
  'GJhktsxDWw':  'i',
  'Xdqasdasdaswetx':  'j',
  'FwwswwwqQxxII':  'k',
  'UYTxwtrXXXQSDD':  'l',
  'pLMWddsadasrty':  'm',
  'GgqsahTsssS':  'n',
  'Bnmszasdasxc':  'o',
  'DSAhasdasdxqw':  'p',
  'Nqwdqwdqw':  'q',
  'kJjwqdsxxxsqwq':  'r',
  'qwdqQ!as=)%/hdGsasdaswdqw':  's',
  'DHswpoosorx':  't',
  'jh?q!!qw%we)zGxaS':  'u',
  'Jsdadtgqwds':  'v',
  'YqwqwdKMgews':  'w',
  'QetsfFQwjkqsrqw':  'x',
  'sqwdfqwdwqdqw':  'y',
  'eutsjnhdwshc':  'z',
  'Dqwdqwsadsahg':  '0',
  'sfasdqwdDs':  '1',
  'bscxxznfadsadD':  '2',
  'HJasdwqdqqwhgqwdS':  '3',
  'Klkssjkqwdajhdszxa':  '4',
  'SxXessnBasdasanaHagfqmsinKjbuasdlOlmazKaGsadqnarsiesESenAsjda':  '5',
  'sdasdasdastWEwswWW':  '6',
  'AteSxddslereKuhasdsalOlYHsqurYanaarim':  '7',
  'HsadaramsinjwnnnKabulOlmaaszIflaOlmadsassinSenasadsla':  '8',
  'anarimyaxanarimyseslereYssdhuururulesjhnariqadqyylurum':  '9',
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

app.listen(PORT, () => {
  console.log('Server started on http://localhost:'+PORT);
});