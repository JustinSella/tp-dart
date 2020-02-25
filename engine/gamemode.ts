import {Player} from './player';
import {Score} from './score';

export abstract class Gamemode
{
    private _currentPlayer: Player | undefined;
    private _status: string = 'draft';

    constructor(private _players: Array<Player> = []) 
    {
        this.start();
    }

    abstract hasCurrentPlayerWon(): boolean;

    abstract handleShot(score: Score): Array<Score>;

    abstract displayScores(): void;

    public getShotsPerPlayer(): number {
        return 3;
    }

    public start(): this {
        if (this._players.length < 2) return this;

        let j = 0;
        for (let i = this._players.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            [this._players[i], this._players[j]] = [this._players[j], this._players[i]];
        }
        this._currentPlayer = this._players[0];
        this._status = 'started';

        return this;
    }

    public isEnded(): boolean {
        var winners = 0;
        for (let p of this._players) {
            if (p.hasWon) winners++;
        }

        let ended = this._players.length - 1 === winners;
        if (ended) this._status = 'ended';

        return ended;
    }

    public getRank(): number {
        var winners = 0;
        for (let p of this._players) {
            if (p.hasWon) winners++;
        }
        return ++winners;
    }

    public nextPlayer(): Player | undefined {
        if (this._status !== 'started' || this._currentPlayer === undefined) return undefined;

        let currentPlayerIndex = this._players.indexOf(this._currentPlayer);
        let nextPlayerIndex = (currentPlayerIndex === this._players.length - 1) ? 0 : ++currentPlayerIndex;

        this._currentPlayer = this._players[nextPlayerIndex];
        return this._currentPlayer;
    }

    get currentPlayer(): Player | undefined { return this._currentPlayer; }
    get players(): Player[] { return this._players; }
    get status(): string { return this._status };
}