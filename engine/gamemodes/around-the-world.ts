import {Gamemode} from '../gamemode';
import {Score} from '../score';
import {Player} from '../player';

export class AroundTheWorld extends Gamemode
{
    constructor(players: Player[]) {
        super(players);
    }

    hasCurrentPlayerWon(): boolean {
        if (this.status !== 'started' || this.currentPlayer === undefined) return false;

        return this.currentPlayer.score.length === 20;
    }    
    
    handleShot(score: Score): Score[] {
        if (this.currentPlayer === undefined || this.status !== 'started') return [];

        let playerScore = this.currentPlayer.score;

        if ((playerScore.length < 1 && score.sector === 1) 
        || (playerScore[playerScore.length - 1] !== undefined && playerScore[playerScore.length - 1].sector === score.sector - 1))
            this.currentPlayer.addScore(score);

        if (this.hasCurrentPlayerWon())
            this.currentPlayer.rank = this.getRank();

        return this.currentPlayer.score;
    }

    displayScores(): void {
        if (this.currentPlayer === undefined || this.status !== 'started') console.log('La partie n\'a pas commencé.');

        let scores: {[id: string]: {}} = {};
        
        for (let p of this.players) {
            scores[p.username] = {
                rank: p.rank,
                score: (p.score[p.score.length - 1] !== undefined) ? p.score[p.score.length - 1].sector : 0
            }
        }

        console.table(scores);
    }
}