export class Score
{
    readonly sector: number;
    readonly multiplicator: number;

    constructor(sector: number, multiplicator?: number)
    {
        if (![0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25].includes(sector))
            throw new Error(`Invalid sector given ${sector}`);
        
        if (multiplicator && ![1,2,3].includes(multiplicator))
            throw new Error(`Invalid multiplicator given ${multiplicator}`);
            
        this.sector = sector;
        this.multiplicator = multiplicator ?? 1;
    }
}