"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gamemode_1 = require("../gamemode");
class AroundTheWorld extends gamemode_1.Gamemode {
    constructor(players) {
        super(players);
    }
    hasCurrentPlayerWon() {
        return this.currentPlayer.score.length === 20;
    }
    handleShot(score) {
        let playerScore = this.currentPlayer.score;
        if ((playerScore.length < 1 && score.sector === 1)
            || (playerScore[playerScore.length - 1] !== undefined && playerScore[playerScore.length - 1].sector === score.sector - 1))
            this.currentPlayer.addScore(score);
        if (this.hasCurrentPlayerWon())
            this.currentPlayer.rank = this.getRank();
        return this.currentPlayer.score;
    }
    displayScores() {
        let scores = {};
        for (let p of this.players) {
            scores[p.username] = {
                rank: p.rank,
                score: (p.score[p.score.length - 1] !== undefined) ? p.score[p.score.length - 1].sector : 0
            };
        }
        console.table(scores);
    }
}
exports.AroundTheWorld = AroundTheWorld;
