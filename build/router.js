"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const game_1 = require("./routers/game");
const player_1 = require("./routers/player");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
app
    // Middlewares
    .use(bodyParser.urlencoded({ 'extended': true }))
    .use(bodyParser.json())
    .use(methodOverride('_method'))
    // Main routes
    .get('/', (req, res, next) => {
    res.format({
        html: () => {
            res.redirect(301, '/games');
        },
        json: () => {
            res.status(406).json({ type: 'NOT_ACCEPTABLE', message: "Le format attendu (header Accept) n'est pas pris en charge" });
        }
    });
})
    .use('/games', game_1.default)
    .use('/players', player_1.default);
exports.default = app;
