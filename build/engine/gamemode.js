"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gamemode {
    constructor(_players = []) {
        this._players = _players;
        this._status = 'draft';
        this.start();
    }
    getShotsPerPlayer() {
        return 3;
    }
    start() {
        if (this._players.length < 2)
            return this;
        let j = 0;
        for (let i = this._players.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            [this._players[i], this._players[j]] = [this._players[j], this._players[i]];
        }
        this._currentPlayer = this._players[0];
        this._status = 'started';
        return this;
    }
    isEnded() {
        var winners = 0;
        for (let p of this._players) {
            if (p.hasWon)
                winners++;
        }
        let ended = this._players.length - 1 === winners;
        if (ended)
            this._status = 'ended';
        return ended;
    }
    getRank() {
        var winners = 0;
        for (let p of this._players) {
            if (p.hasWon)
                winners++;
        }
        return ++winners;
    }
    nextPlayer() {
        if (this._status !== 'started' || this._currentPlayer === undefined)
            return undefined;
        let currentPlayerIndex = this._players.indexOf(this._currentPlayer);
        let nextPlayerIndex = (currentPlayerIndex === this._players.length - 1) ? 0 : ++currentPlayerIndex;
        this._currentPlayer = this._players[nextPlayerIndex];
        return this._currentPlayer;
    }
    get currentPlayer() { return this._currentPlayer; }
    get players() { return this._players; }
    get status() { return this._status; }
    ;
}
exports.Gamemode = Gamemode;
