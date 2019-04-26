const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res, next) => {
    if(req.url === '/about') {
        return res.end(aboutPage);
    } else {
        res.send('this server is running with nodemon');
    }
    
});

app.get('/about', (req, res, next) => {
    return res.end(aboutPage);
});

// read about page 
const aboutPage = fs.readFileSync('about.html');

app.listen(8001, () => {
    console.log('App is listing on port 8001');
});