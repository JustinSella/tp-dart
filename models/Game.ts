import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameModel = new Schema({
    mode: {type: String},
    name: {type: String},
    currentPlayerId: {type: Number},
    status: {type: String},
    createdAt: {type: Date}
})

export default mongoose.model('game', gameModel);