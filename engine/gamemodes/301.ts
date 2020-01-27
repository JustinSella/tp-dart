import {Gamemode} from '../gamemode';
import {Score} from '../score';
import {Player} from '../player';

export class TroisCentUn extends Gamemode
{
    constructor(players: Player[]) {
        super(players);
    }

    private getTotalScore(score: Score[]): number {
        var total = 301;

        for (let s of score) {
            total -= s.sector * s.multiplicator;
        }

        return total;
    }

    hasCurrentPlayerWon(): boolean {
        return this.getTotalScore(this.currentPlayer.score) === 0;
    }    
    
    handleShot(score: Score): Score[] {
        let playerScore = this.currentPlayer.score;
        let total = this.getTotalScore([...playerScore, score]);
    
        if ((total === 0 && score.multiplicator === 2) || total > 1)
            this.currentPlayer.addScore(score);

        if (this.hasCurrentPlayerWon())
            this.currentPlayer.rank = this.getRank();

        return this.currentPlayer.score;
    }

    displayScores(): void {
        let scores: {[id: string]: {}} = {};
        
        for (let p of this.players) {
            scores[p.username] = {
                rank: p.rank,
                score: this.getTotalScore(p.score)
            }
        }

        console.table(scores);
    }
}