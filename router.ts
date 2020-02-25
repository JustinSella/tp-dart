import express = require('express');
import gameRouter from './routers/game';
import playerRouter from './routers/player';
import bodyParser = require('body-parser');
import methodOverride = require('method-override');

const app = express();

app
// Middlewares
.use(bodyParser.urlencoded({'extended': true}))
.use(bodyParser.json())
.use(methodOverride('_method'))

// Main routes
.get('/', (req, res, next) => {
    res.format({
        html: () => {
            res.redirect(301, '/games')
        },
        json: () => {
            res.status(406).json({type: 'NOT_ACCEPTABLE', message: "Le format attendu (header Accept) n'est pas pris en charge"})
        }
    })
})
.use('/games', gameRouter)
.use('/players', playerRouter);

export default app;
