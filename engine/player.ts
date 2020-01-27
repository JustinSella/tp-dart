import {Score} from "./score";

export class Player
{
    private _score: Array<Score> = [];
    private _hasWon: boolean = false;
    private _rank: number = 0;

    constructor(readonly username: string) {}

    get score(): Score[] { return this._score; }
    addScore(score: Score): Array<Score> {
        this._score.push(score);
        return this._score;
    }

    removeLastScore(): Array<Score> {
        this._score.pop();
        return this._score;
    }

    get rank(): number { return this._rank; }
    set rank(rank: number) { 
        this._rank = rank;
        this._hasWon = true;
    }

    get hasWon(): boolean { return this._hasWon; }
}