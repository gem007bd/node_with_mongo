const express = require('express');
const mongoose = require('mongoose');
const expressEdge = require('express-edge');
const app = express();

mongoose.connect('mongodb://localhost/node-js-blog');
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

// url for create a post 
app.get('/posts/new', (req, res, next) => {
    res.render('create')
});
// admin login panel
app.get('/admin', (req, res, next) => {
    res.render('admin')
});

app.listen(8001, () => {
    console.log('App is listing on port 8001');
});