import {Player} from './player';
import {Score} from './score';

export abstract class Gamemode
{
    private _currentPlayer: Player;

    constructor(private _players: Array<Player>)
    {
        let j = 0;
        for (let i = _players.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            [_players[i], _players[j]] = [_players[j], _players[i]];
        }
        this._currentPlayer = _players[0];
    }

    abstract hasCurrentPlayerWon(): boolean;

    abstract handleShot(score: Score): Array<Score>;

    abstract displayScores(): void;

    public getShotsPerPlayer(): number {
        return 3;
    }

    public isEnded(): boolean {
        var winners = 0;
        for (let p of this._players) {
            if (p.hasWon) winners++;
        }
        return this._players.length - 1 === winners;
    }

    public getRank(): number {
        var winners = 0;
        for (let p of this._players) {
            if (p.hasWon) winners++;
        }
        return ++winners;
    }

    public nextPlayer(): Player {
        let currentPlayerIndex = this._players.indexOf(this._currentPlayer);
        let nextPlayerIndex = (currentPlayerIndex === this._players.length - 1) ? 0 : ++currentPlayerIndex;

        this._currentPlayer = this._players[nextPlayerIndex];
        return this._currentPlayer;
    }

    get currentPlayer(): Player { return this._currentPlayer; }
    get players(): Player[] { return this._players; }
}