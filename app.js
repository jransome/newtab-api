const express = require('express');
const bodyParser = require('body-parser');

const newsRouter = require('./routes/newsRouter')();

const port = process.env.PORT || 2999;

const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routers
app.use('/news', newsRouter); 

app.get('/', (req, res) => {
    res.send('Welcome to THE NEW TAB APi.');
});

app.listen(port, () => {
    console.log('Running on PORT:', port);
});

module.exports = app;