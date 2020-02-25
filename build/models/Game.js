"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gameModel = new Schema({
    mode: { type: String },
    name: { type: String },
    currentPlayerId: { type: Number },
    status: { type: String },
    createdAt: { type: Date }
});
exports.default = mongoose.model('game', gameModel);
