"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const scoreModel = new Schema({
    gameId: { type: Number },
    playerId: { type: Number },
    multiplicator: { type: Number },
    sector: { type: Number },
    createdAt: { type: Date }
});
exports.default = mongoose.model('gameShot', scoreModel);
