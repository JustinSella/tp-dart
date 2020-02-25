import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerModel = new Schema({
    playerId: {type: Number},
    gameId: {type: Number},
    remainingShots: {type: Number, nullable: true},
    score: {type: Number},
    rank: {type: Number},
    order: {type: Number},
    createdAt: {type: Date}
})

export default mongoose.model('gamePlayer', playerModel);