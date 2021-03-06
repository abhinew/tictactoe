// src/pages/controller.ts
import { JsonController, Get, Param, Put, Body, NotFoundError, HttpCode, Post, BodyParam, OnUndefined } from 'routing-controllers'
import Game from './entity'
import { validate } from 'class-validator';
import { moves } from './lib';

async function changeGame (newObj, id) {

  const game = await Game.findOne(id);

  if(!game) {
    throw new NotFoundError('Cannot find game');
  }

  if(newObj.board) {
    numberOfMoves = moves(newObj.board, game.board);
    if (numberOfMoves > 1) {
      console.log("test")
    }
  }

  return Game.merge(game, newObj).save();
}

let numberOfMoves;
@JsonController()
export default class GameController {
    @Post('/games')
    @HttpCode(201)
    createGame(@BodyParam('name') name: string) { 
      let colorList = ['red', 'blue', 'green', 'yellow', 'magenta'];
      let randomNumber = Math.floor(Math.random() * colorList.length);

      let game = new Game();
      game.name = name;
      game.color = colorList[randomNumber];
      game.board = [
        ['o', 'o', 'o'],
        ['o', 'o', 'o'],
        ['o', 'o', 'o']
      ]
      return game.save();
    }
    
    @Get('/games')
    async allGames() {
      const games = await Game.find()
      return { games }
    }


    @Get('/games/:id')
    getGame(
      @Param('id') id: number
    ) {
      return Game.findOne(id)
    }

    @Put('/games/:id')
    @OnUndefined(400)
    async updateGame( @Param('id') id: number, @Body() update: Object) {
      let newObj = new Game();
      Object.assign(newObj, update);
      validate(newObj)
        .then(errors => {
            if (errors.length > 0) {
              console.log("Validation failed. errors: ", errors)
              return undefined;
            }  
            else {
              changeGame(newObj, id);
            }
        })
        .catch(reason => {
          console.log(reason);
        });
          return { status: "Update successful"};
      }
};





