"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const around_the_world_1 = require("./engine/gamemodes/around-the-world");
const _301_1 = require("./engine/gamemodes/301");
const inquirer = require("inquirer");
const player_1 = require("./engine/player");
const score_1 = require("./engine/score");
function promptPlayers() {
    return __awaiter(this, void 0, void 0, function* () {
        let askPlayerNumber = inquirer.prompt([
            {
                name: 'playerNumber',
                type: 'number',
                message: 'Combien de joueurs êtes-vous ?',
                validate: (playerNumber) => { return playerNumber > 1; }
            }
        ]);
        let answerPlayerNumber = yield askPlayerNumber;
        let playerNumber = answerPlayerNumber.playerNumber;
        var players = [];
        for (let i = playerNumber; i > 0; i--) {
            let promptUsername = inquirer.prompt([
                {
                    name: `username`,
                    type: 'input',
                    message: 'Entrez un nom d\'utilisateur : ',
                    validate: (input) => { return (input !== undefined && input !== ''); }
                }
            ]);
            let answerUsername = yield promptUsername;
            let username = answerUsername.username;
            players.push(new player_1.Player(username));
        }
        return players;
    });
}
function promptGamemode(players) {
    return __awaiter(this, void 0, void 0, function* () {
        let gamemodes = ['Around The World', '301', 'Cricket'];
        let askGamemode = inquirer.prompt([
            {
                name: 'gamemode',
                type: 'list',
                choices: gamemodes,
                default: 0
            }
        ]);
        let answerGamemode = yield askGamemode;
        let gamemode = answerGamemode.gamemode;
        switch (gamemode) {
            case gamemodes[0]:
                return new around_the_world_1.AroundTheWorld(players);
            case gamemodes[1]:
                return new _301_1.TroisCentUn(players);
            default:
                return new around_the_world_1.AroundTheWorld(players);
        }
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        var askPlayers = promptPlayers();
        var players = yield askPlayers;
        var askGamemode = promptGamemode(players);
        var gamemode = yield askGamemode;
        return gamemode;
    });
}
function promptShot() {
    return __awaiter(this, void 0, void 0, function* () {
        let askShot = inquirer.prompt([
            {
                name: 'sector',
                type: 'number',
                message: 'Quel secteur avez-vous touché ? (0 si vous avez loupé)',
                validate: (input) => { return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25].includes(input); }
            },
            {
                name: 'multiplicator',
                type: 'list',
                choices: (answers) => { return (answers.sector === 25) ? [1, 2] : [1, 2, 3]; },
                message: 'Quel multiplicateur avec vous touché ?'
            }
        ]);
        let shot = yield askShot;
        return new score_1.Score(shot.sector, shot.multiplicator);
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        var game = yield start();
        while (!game.isEnded()) {
            if (game.currentPlayer.hasWon) {
                game.nextPlayer();
                continue;
            }
            console.log(`A ${game.currentPlayer.username} de jouer !`);
            for (let s = game.getShotsPerPlayer(); s > 0; s--) {
                if (game.currentPlayer.hasWon) {
                    console.log(`Joueur ${game.currentPlayer.username} fini ${game.currentPlayer.rank}${(game.currentPlayer.rank === 1) ? 'er' : 'ème'}`);
                    break;
                }
                let askShot = promptShot();
                let shot = yield askShot;
                game.handleShot(shot);
            }
            game.displayScores();
            game.nextPlayer();
        }
        console.log('Partie terminée !');
    });
}
init();
