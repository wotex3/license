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

app.use(bodyParser.urlencoded({ extended: true }));

const apiKeys = {
  ['DWAZqDyR0F8SzdcBlti2']: true,
}

// const linksx = {
//   'https://keymaster.fivem.net/': {
//     label: 'Keymaster',
//     status: false,
//   },
//   'https://status.cfx.re/api/v2/status.json': {
//     label: 'Cfx.re Status',
//     status: false,
//   },
// };

const cfxURL = 'https://status.cfx.re/api/v2/status.json'
let cfxReIsActive = false;

app.get('/', async (req, res) => {
  res.render('index')
  // const obj = await Customer.find({});
  // try {
  //   cfxReIsActive = true;
  //   const response = await axios.get(cfxURL);
  //   if (response.status === 200) {
  //     console.log(response.data.status.description)
  //     if (response.data.status.description != 'All Systems Operational') {
  //       cfxReIsActive = false;
  //     }
  //   }
  //   res.render('secondLayout', { data: obj, statusCfx: cfxReIsActive }); 
  //   // res.render('index')
  // } catch (err) {
  //   throw err;
  // }
  // try {
  //   const obj = await Customer.find({});
  //   for (const url in linksx) {
  //     linksx[url].status = false;
  //   }
  //   for (const url in linksx) {
  //     try {
  //       const response = await axios.get(url);
  //       if (response.status === 200) {
  //         linksx[url].status = true;
  //         if (url == 'https://status.cfx.re/api/v2/status.json') {
  //           if (response.data.status.description != 'All Systems Operational') {
  //             linksx[url].status = false;
  //           }
  //         }
  //       } else {
  //         linksx[url].status = false;
  //       }
  //     } catch (error) {
  //       linksx[url].status = false;
  //     }
  //   }
  //   res.render('secondLayout', { data: obj, links: linksx });
  // } catch (err) {
  //   res.sender('index')
  // }
});

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://wht3636:Berkberk2002@cluster0.l7zokyy.mongodb.net/', () => {
  console.log("connection to mongodb finished");
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
  console.log(req.body)
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
          console.log(response.data.status.description)
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

app.get('/auth', async (req, res) => {
  const userip = req.headers["x-real-ip"] || req.socket.remoteAddress || 'Null-IpAdres';
  const randomNumber = req.query.randomNumber;
  const deobfusactedRandomNumber = deobfuscateStr(randomNumber);
  const successString = obfuscateStr('success-'+deobfusactedRandomNumber)
  Customer.find({ ip: userip }, function (err, customers) {
    if (err) {
      console.error("Veritabanı hatası:", err);
      return res.status(500).send("An sql error occurred");
    }
    
    if (customers.length === 0) {
      res.send('An error occurred')
    } else {
      const isExpired = customers[0].date < new Date().toISOString().split('T')[0]
      if (isExpired == true) {
        Customer.findOneAndDelete(
          { ip: userip },
        )
        .then(() => {
          Customer.find({}, function (err, obj) {
            res.send('Expired')
          })
        }).catch((err) => res.send('333'));
      } else {
        res.send(successString)
      }
    }
  })
})

app.listen(PORT, () => {
    console.log('Server started on http://localhost:'+PORT);
});