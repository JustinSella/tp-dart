"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gamemode_1 = require("../gamemode");
class TroisCentUn extends gamemode_1.Gamemode {
    constructor(players) {
        super(players);
    }
    getTotalScore(score) {
        var total = 301;
        for (let s of score) {
            total -= s.sector * s.multiplicator;
        }
        return total;
    }
    hasCurrentPlayerWon() {
        if (this.currentPlayer === undefined || this.status !== 'started')
            return false;
        return this.getTotalScore(this.currentPlayer.score) === 0;
    }
    handleShot(score) {
        if (this.currentPlayer === undefined || this.status !== 'started')
            return [];
        let playerScore = this.currentPlayer.score;
        let total = this.getTotalScore([...playerScore, score]);
        if ((total === 0 && score.multiplicator === 2) || total > 1)
            this.currentPlayer.addScore(score);
        if (this.hasCurrentPlayerWon())
            this.currentPlayer.rank = this.getRank();
        return this.currentPlayer.score;
    }
    displayScores() {
        if (this.currentPlayer === undefined || this.status !== 'started')
            console.log('La partie n\'a pas commencé');
        let scores = {};
        for (let p of this.players) {
            scores[p.username] = {
                rank: p.rank,
                score: this.getTotalScore(p.score)
            };
        }
        console.table(scores);
    }
}
exports.TroisCentUn = TroisCentUn;
