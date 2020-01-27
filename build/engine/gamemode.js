"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gamemode {
    constructor(_players) {
        this._players = _players;
        let j = 0;
        for (let i = _players.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            [_players[i], _players[j]] = [_players[j], _players[i]];
        }
        this._currentPlayer = _players[0];
    }
    getShotsPerPlayer() {
        return 3;
    }
    isEnded() {
        var winners = 0;
        for (let p of this._players) {
            if (p.hasWon)
                winners++;
        }
        return this._players.length - 1 === winners;
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
        let currentPlayerIndex = this._players.indexOf(this._currentPlayer);
        let nextPlayerIndex = (currentPlayerIndex === this._players.length - 1) ? 0 : ++currentPlayerIndex;
        this._currentPlayer = this._players[nextPlayerIndex];
        return this._currentPlayer;
    }
    get currentPlayer() { return this._currentPlayer; }
    get players() { return this._players; }
}
exports.Gamemode = Gamemode;
