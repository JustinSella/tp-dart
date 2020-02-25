import express = require('express');
import mongoose = require('mongoose');
import app from './router';
import exphbs = require('express-handlebars');

const db = mongoose.connect('mongodb://localhost:27017/dart');
const port = process.env.PORT || 8080;
 
app.engine('hbs', exphbs({extname: 'hbs', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
console.log(__dirname + '/views')

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
