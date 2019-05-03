const express = require('express');
const expressEdge = require('express-edge');
const app = express();

//setting middleware
app.use(express.static('public'));

// require express-edge
app.use(expressEdge);
app.set('views', `${__dirname}/views/layouts`);

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/post', (req, res, next) => {
    res.render('post');
});

app.get('/contact', (req, res, next) => {
    res.render('contact')
});

app.listen(8001, () => {
    console.log('App is listing on port 8001');
});