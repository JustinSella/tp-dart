"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Game_1 = require("../models/Game");
const Player_1 = require("../models/Player");
const GamePlayer_1 = require("../models/GamePlayer");
const GameShot_1 = require("../models/GameShot");
const router = express.Router();
router
    .get('/', (req, res, next) => {
    Game_1.default.find((err, games) => {
        if (err) {
            res.status(500).write({ type: 'SERVER_ERROR', message: 'Erreur inconnue ou crash côté serveur' });
        }
        games = games.map(e => e.toJSON(), games);
        res.format({
            json: () => { res.json(games); },
            html: () => {
                res.render('game/all', { games: games });
            }
        });
    });
})
    .get('/new', (req, res, next) => {
    res.format({
        html: () => {
            res.render('game/new');
        },
        json: () => {
            res.status(406).json({ type: 'NOT_API_AVAILABLE', message: 'Ce endpoint n\'est pas accessible depuis l\'api' });
        }
    });
})
    .post('/', (req, res, next) => {
    let game = new Game_1.default({
        mode: req.body.mode,
        name: req.body.name,
        currentPlayerId: undefined,
        status: 'draft',
        createdAt: Date.now()
    });
    game.save()
        .then(doc => {
        console.log(doc);
        res.format({
            json: () => {
                res.json(doc);
            },
            html: () => {
                res.redirect(301, `/games/${doc._id}`);
            }
        });
    })
        .catch(err => {
        res.format({
            json: () => {
                res.status(400).json({ type: 'INVALUD_FORMAT', message: 'Les données saisies sont invalides' });
            },
            html: () => {
                res.redirect(302, '/games/new');
            }
        });
    });
})
    .get('/:id', (req, res, next) => {
    Game_1.default.findOne({ _id: req.params.id }, ((err, game) => {
        var _a;
        if (err) {
            res.format({
                html: () => {
                    res.status(404).send('Game not found');
                },
                json: () => {
                    res.status(404).json({ type: 'NOT_FOUND', message: 'Aucune game avec cet id' });
                }
            });
        }
        game = (_a = game) === null || _a === void 0 ? void 0 : _a.toJSON();
        res.format({
            html: () => { res.render('game/get', { game: game }); },
            json: () => { res.json(game); }
        });
    }));
})
    .get('/:id/edit', (req, res, next) => {
    res.format({
        html: () => {
            res.render('game/new', { edit: true, id: req.params.id });
        },
        json: () => {
            res.status(406).json({ type: 'NOT_API_AVAILABLE', message: 'Ce endpoint n\'est pas accessible depuis l\'api' });
        }
    });
})
    .patch('/:id', (req, res, next) => {
    Game_1.default.findOneAndUpdate({ _id: req.params.id, status: 'draft' }, req.body, (err, game) => {
        if (err) {
            res.format({
                html: () => {
                    res.status(404).send('Game not found');
                },
                json: () => {
                    res.status(404).json({ type: 'NOT_FOUND', message: 'Game not found' });
                }
            });
        }
        res.format({
            html: () => {
                res.redirect(301, `/games/${req.params.id}`);
            },
            json: () => {
                res.json(game);
            }
        });
    });
})
    .delete('/:id', (req, res, next) => {
    Game_1.default.findOneAndDelete({ _id: req.params.id }, (err, game) => {
        if (err) {
            res.format({
                html: () => {
                    res.status(404).send('Game not found');
                },
                json: () => {
                    res.status(404).json({ type: 'NOT_FOUND', message: 'Game not found' });
                }
            });
        }
        res.format({
            html: () => {
                res.redirect(301, '/games');
            },
            json: () => {
                res.status(204).json({});
            }
        });
    });
})
    .get('/:id/players', (req, res, next) => {
    GamePlayer_1.default.find({ gameId: req.params.id }, (err, gamePlayers) => {
        Player_1.default.find({ _id: gamePlayers }, (err, players) => {
            res.format({
                html: () => {
                    res.render('game/players', { players: players });
                },
                json: () => {
                    res.json(players);
                }
            });
        });
    });
})
    .post('/:id/players', (req, res, next) => {
    let gamePlayer = new GamePlayer_1.default({
        playerId: req.body.playerId,
        gameId: req.params.id
    });
    gamePlayer.save((err, gamePlayer) => {
        res.format({
            html: () => {
                res.redirect(301, `/games/${req.params.id}/players`);
            },
            json: () => {
                res.status(204).json();
            }
        });
    });
})
    .delete('/:id/players', (req, res, next) => {
    GamePlayer_1.default.findOneAndDelete({ gameId: req.params.id, playerId: req.body.playerId }, (err, gamePlayer) => {
        res.format({
            html: () => {
                res.redirect(301, `/games/${req.params.id}/players`);
            },
            json: () => {
                res.status(204).json();
            }
        });
    });
})
    .post('/:id/shots', (req, res, next) => {
    let gameShot = new GameShot_1.default({
        gameId: req.params.id,
        playerId: req.body.playerId,
        sector: req.body.sector,
        multiplicator: req.body.multiplicator,
        createdAt: Date.now()
    });
    gameShot.save((err, gameShot) => {
        res.format({
            html: () => {
                res.redirect(301, `/games/${req.params.id}`);
            },
            json: () => {
                res.status(204).json();
            }
        });
    });
});
exports.default = router;
