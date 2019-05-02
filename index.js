const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

//setting middleware
app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.sendFile(path.resolve('public/pages/index.html'))
});

app.get('/about', (req, res, next) => {
    return res.end(aboutPage);
});

// read about page 
const aboutPage = fs.readFileSync('public/pages/about.html');

app.listen(8001, () => {
    console.log('App is listing on port 8001');
});