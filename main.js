const GamemodeWorld = require('./Classes/GamemodeWorld')

const start = async () => {
    var game = new GamemodeWorld()
    while (!game.isOver()) {
        let players = await game.nextRound()
        let table = []

        players.forEach(p => {
            table[p.pseudo] = {
                won: p.won,
                score: p.getTotalScore()
            }
        })
        console.table(table)
    }
}

start()