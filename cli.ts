import {AroundTheWorld} from './engine/gamemodes/around-the-world';
import {TroisCentUn} from './engine/gamemodes/301';
import {Gamemode} from './engine/gamemode';
import inquirer = require('inquirer');
import {Player} from './engine/player';
import {Score} from './engine/score';

async function promptPlayers(): Promise<Player[]> {
    let askPlayerNumber: Promise<{playerNumber: number}> = inquirer.prompt([
        { 
            name: 'playerNumber',
            type: 'number',
            message: 'Combien de joueurs êtes-vous ?',
            validate: (playerNumber: number) => { return playerNumber > 1 }
        }
    ])

    let answerPlayerNumber = await askPlayerNumber;
    let playerNumber = answerPlayerNumber.playerNumber;
    var players: Player[] = [];
    for (let i = playerNumber; i > 0; i--) {
        let promptUsername = inquirer.prompt([
            {
                name: `username`,
                type: 'input',
                message: 'Entrez un nom d\'utilisateur : ',
                validate: (input: string): boolean => { return (input !== undefined && input !== ''); }
            }
        ]);

        let answerUsername = await promptUsername;
        let username = answerUsername.username;
        players.push(new Player(username));
    }

    return players;
}

async function promptGamemode(players: Player[]): Promise<Gamemode> {
    let gamemodes = ['Around The World', '301', 'Cricket'];
    let askGamemode = inquirer.prompt([
        {
            name: 'gamemode',
            type: 'list',
            choices: gamemodes,
            default: 0
        }
    ])

    let answerGamemode = await askGamemode;
    let gamemode = answerGamemode.gamemode;
    switch (gamemode) {
        case gamemodes[0]:
            return new AroundTheWorld(players);
        case gamemodes[1]:
            return new TroisCentUn(players);
        default:
            return new AroundTheWorld(players);
    }
}

async function start(): Promise<Gamemode> {
    var askPlayers = promptPlayers();
    var players = await askPlayers;

    var askGamemode = promptGamemode(players);
    var gamemode = await askGamemode;

    return gamemode;
}

async function promptShot(): Promise<Score> {
    let askShot: Promise<{[id: string]: any}> = inquirer.prompt([
        {
            name: 'sector',
            type: 'number',
            message: 'Quel secteur avez-vous touché ? (0 si vous avez loupé)',
            validate: (input: number) => { return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25].includes(input) }
        },
        {
            name: 'multiplicator',
            type: 'list',
            choices: (answers: {sector: number}) => { return (answers.sector === 25) ? [1,2] : [1,2,3] },
            message: 'Quel multiplicateur avec vous touché ?'
        }
    ])
    let shot = await askShot;

    return new Score(shot.sector, shot.multiplicator);
}

async function init(): Promise<void> {
    var game = await start();

    while(!game.isEnded()) {
        if (game.currentPlayer.hasWon) {
            game.nextPlayer();
            continue;
        }

        console.log(`A ${game.currentPlayer.username} de jouer !`);
        for (let s = game.getShotsPerPlayer(); s > 0; s--) {
            if (game.currentPlayer.hasWon) {
                console.log(`Joueur ${game.currentPlayer.username} fini ${game.currentPlayer.rank}${(game.currentPlayer.rank === 1) ? 'er' : 'ème'}`)
                break;
            }

            let askShot = promptShot();
            let shot = await askShot;
            game.handleShot(shot);
        }
        game.displayScores();
        game.nextPlayer();
    }

    console.log('Partie terminée !');
}

init();