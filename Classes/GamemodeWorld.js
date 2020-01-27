const Gamemode = require('./Gamemode')
const Utils = require('./Utils')

class GamemodeWorld extends Gamemode {
    constructor() { super() }

    checkWin(player) {
        let allSectors = []
        for (let i = 1; i < 21; i++) { allSectors.push(i) }

        let hittedSectors = []
        player.score.forEach(elem => {
            hittedSectors = Utils.arrayDiff(hittedSectors, elem)
        })

        for (let elem of allSectors) {
            if (!hittedSectors.includes(elem)) return false
        }

        return true
    }
}

module.exports = GamemodeWorld