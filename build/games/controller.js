"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/controller.ts
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const class_validator_1 = require("class-validator");
const lib_1 = require("./lib");
async function changeGame(newObj, id) {
    const game = await entity_1.default.findOne(id);
    if (!game) {
        throw new routing_controllers_1.NotFoundError('Cannot find game');
    }
    if (newObj.board) {
        numberOfMoves = lib_1.moves(newObj.board, game.board);
        if (numberOfMoves > 1) {
            console.log("test");
        }
    }
    return entity_1.default.merge(game, newObj).save();
}
let numberOfMoves;
let GameController = class GameController {
    createGame(name) {
        let colorList = ['red', 'blue', 'green', 'yellow', 'magenta'];
        let randomNumber = Math.floor(Math.random() * colorList.length);
        let game = new entity_1.default();
        game.name = name;
        game.color = colorList[randomNumber];
        game.board = [
            ['o', 'o', 'o'],
            ['o', 'o', 'o'],
            ['o', 'o', 'o']
        ];
        return game.save();
    }
    async allGames() {
        const games = await entity_1.default.find();
        return { games };
    }
    getGame(id) {
        return entity_1.default.findOne(id);
    }
    async updateGame(id, update) {
        let newObj = new entity_1.default();
        Object.assign(newObj, update);
        class_validator_1.validate(newObj)
            .then(errors => {
            if (errors.length > 0) {
                console.log("Validation failed. errors: ", errors);
                return undefined;
            }
            else {
                changeGame(newObj, id);
            }
        })
            .catch(reason => {
            console.log(reason);
        });
        return { status: "Update successful" };
    }
};
__decorate([
    routing_controllers_1.Post('/games'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.BodyParam('name'))
], GameController.prototype, "createGame", null);
__decorate([
    routing_controllers_1.Get('/games')
], GameController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Get('/games/:id'),
    __param(0, routing_controllers_1.Param('id'))
], GameController.prototype, "getGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    routing_controllers_1.OnUndefined(400),
    __param(0, routing_controllers_1.Param('id')), __param(1, routing_controllers_1.Body())
], GameController.prototype, "updateGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
;
