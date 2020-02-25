"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const playerModel = new Schema({
    name: { type: String },
    email: { type: String },
    gameWin: { type: Number },
    gameLost: { type: Number },
    createdAt: { type: Date }
});
exports.default = mongoose.model('player', playerModel);
