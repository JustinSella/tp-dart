const Inquirer = require('inquirer')

class Player {
    
    constructor(pseudo, playerNumber) {
        if (typeof pseudo === 'string') this.pseudo = pseudo
        this.hasPlayed = false
        this.won = false
        this.score = []
    }

    getTotalScore() {
        let res = 0
        for (let r of this.score) {
            res += r.reduce(function(acc, val) { return acc + val; }, 0)
        }

        return res
    }

    getLastRound() {
        return this.getRound(this.score.length - 1)
    }

    getRound(round) {
        return this.score[round]
    }

    cancelLastRound() {
        this.score.pop()
    }

    play() {  
        return Inquirer
        .prompt([
            { name: 'dart1', type: 'number', message: 'Quel est le score de votre 1ère fléchette ?' },
            { name: 'dart2', type: 'number', message: 'Quel est le score de votre 2ème fléchette ?' },
            { name: 'dart3', type: 'number', message: 'Quel est le score de votre 3ème fléchette ?' },
            { name: 'confirm', type: 'confirm', message: 'Confirmez-vous ce résultat ?' }
        ])
        .then(answers => {
            if (answers.confirm) this.score.push([answers.dart1, answers.dart2, answers.dart3])
            return answers
        })
        .catch(err => {
            return this.play()
        })
    }

    win() {
        this.won = true
        console.log(`${this.pseudo} a terminé !`)
    }
}

module.exports = Player