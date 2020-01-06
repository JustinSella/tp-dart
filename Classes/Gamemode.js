const Player = require('./Player')
const Utils = require('./Utils')

class Gamemode {
    constructor(players) {
        this.players = players
        this.currentPlayer = null

        if (!this.players || this.players.length < 2) this.players = [new Player('Player 1'), new Player('Player 2')]
        this.players = Utils.shuffle(this.players)
    }

    nextPlayer() {
        this.currentPlayer = this.players.find(elem => !elem.hasPlayed && !elem.won)
        
        // If all players already played
        if (!this.currentPlayer) this.players.forEach(elem => {
            elem.hasPlayed = false
            return this.nextPlayer()
        })

        return this.currentPlayer
    }

    async nextRound() {
        this.nextPlayer()
        console.log(`A ${this.currentPlayer.pseudo} de jouer.`)
        var answers = await this.currentPlayer.play()
        var round = this.currentPlayer.getLastRound()

        while (!this.checkRound(round)) {
            this.currentPlayer.cancelLastRound()
            answers = await this.currentPlayer.play()
            round = this.currentPlayer.getLastRound()
        }

        if (this.checkWin(this.currentPlayer)) this.currentPlayer.win()

        return this.players
    }

    checkRound(round) {
        if (round === undefined) return false
        return round.length === 3
    }

    checkWin(player) {
        return false
    }

    isOver() {
        return (this.players.find(p => p.won = false))
    }
}

module.exports = Gamemode