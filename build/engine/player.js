"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(username) {
        this.username = username;
        this._score = [];
        this._hasWon = false;
        this._rank = 0;
    }
    get score() { return this._score; }
    addScore(score) {
        this._score.push(score);
        return this._score;
    }
    removeLastScore() {
        this._score.pop();
        return this._score;
    }
    get rank() { return this._rank; }
    set rank(rank) {
        this._rank = rank;
        this._hasWon = true;
    }
    get hasWon() { return this._hasWon; }
}
exports.Player = Player;
