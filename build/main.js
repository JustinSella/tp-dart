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
const GamemodeWorld = require('./Classes/GamemodeWorld');
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    var game = new GamemodeWorld();
    while (!game.isOver()) {
        let players = yield game.nextRound();
        let table = [];
        players.forEach(p => {
            table[p.pseudo] = {
                won: p.won,
                score: p.getTotalScore()
            };
        });
        console.table(table);
    }
});
start();
