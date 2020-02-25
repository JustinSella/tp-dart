import express = require('express');
import Player from '../models/Player';

const router = express.Router();

router
.get('/', (req, res, next) => {
    Player.find((err, players) => {
        res.format({
            html: () => {
                res.render('player/players', {players: players})
            },
            json: res.json(players)
        })
    })
})
.post('/', (req, res, next) => {
    let player = new Player({
        name: req.body.name,
        email: req.body.email,
        createdAt: Date.now()
    })

    player.save((err, player) => {
        res.format({
            html: () => {
                res.redirect(301, '/players')
            },
            json: () => {
                res.status(201).json(player)
            }
        })
    })
})
.get('/new', (req, res, next) => {
    res.format({
        html: () => {
            res.render('player/new')
        },
        json: () => {
            res.status(406).json({type: 'NOT_API_AVAILABLE', message: 'Ce endpoint n\'est pas accessible depuis l\'api'})
        }
    })
})
.get('/:id', (req, res, next) => {
    Player.findById(req.params.id, (err, player) => {
        res.format({
            html: () => {
                res.render('player/get', {player: player})
            },
            json: () => {
                res.json(player)
            }
        })
    })
})
.get('/:id/edit', (req, res, next) => {
    res.format({
        html: () => {
            res.render('game/new', {edit: true, id: req.params.id})
        },
        json: () => {
            res.status(406).json({type: 'NOT_API_AVAILABLE', message: 'Ce endpoint n\'est pas accessible depuis l\'api'})
        }
    })
})
.patch('/:id', (req, res, next) => {
    Player.findOneAndUpdate({_id: req.params.id}, req.body, (err, player) => {
        if (err) {
            res.format({
                html: () => {
                    res.status(404).send('Player not found')
                },
                json: () => {
                    res.status(404).json({type: 'NOT_FOUND', message: 'Player not found'})
                }
            })
        }

        res.format({
            html: () => {
                res.redirect(301, `/players/${req.params.id}`)
            },
            json: () => {
                res.json(player)
            }
        })
    })
})
.delete('/:id', (req, res, next) => {
    Player.findOneAndDelete({_id: req.params.id}, (err, player) => {
        if (err) {
            res.format({
                html: () => {
                    res.status(404).send('Player not found')
                },
                json: () => {
                    res.status(404).json({type: 'NOT_FOUND', message: 'Player not found'})
                }
            })
        }

        res.format({
            html: () => {
                res.redirect(301, '/players')
            },
            json: () => {
                res.status(204).json()
            }
        })
    })
})

export default router;