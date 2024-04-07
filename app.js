const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const userInput = req.body.inputValue;
    if (userInput === 'xxxx') {
        const randomData = generateRandomData();
        res.render('secondLayout', { data: randomData });
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

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});