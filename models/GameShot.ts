import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreModel = new Schema({
   gameId: {type: Number},
   playerId: {type: Number},
   multiplicator: {type: Number},
   sector: {type: Number},
   createdAt: {type: Date}
})

export default mongoose.model('gameShot', scoreModel);