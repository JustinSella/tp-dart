"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const router_1 = require("./router");
const exphbs = require("express-handlebars");
const db = mongoose.connect('mongodb://localhost:27017/dart');
const port = process.env.PORT || 8080;
router_1.default.engine('hbs', exphbs({ extname: 'hbs', layoutsDir: __dirname + '/views/layouts' }));
router_1.default.set('view engine', 'hbs');
router_1.default.set('views', __dirname + '/views');
console.log(__dirname + '/views');
router_1.default.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
