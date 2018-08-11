// src/pages/controller.ts
import { JsonController, Get, Param, Put, Body, NotFoundError, HttpCode, Post, BodyParam } from 'routing-controllers'
import Game from './entity'
import { validate } from 'class-validator';


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
    @HttpCode(201)
    async updateGame(
      @Param('id') id: number,
      @Body() update: Object
    ) {
      let newObj = new Game();
      Object.assign(newObj, update);
       validate(newObj).then(errors => {
        async function changeGame () {
          const game = await Game.findOne(id);
          if(!game) {
            throw new NotFoundError('Cannot find game');
          }
          return Game.merge(game, update).save();
        }
        if (errors.length > 0) {
          console.log("Validation failed. errors: ", errors)
        }  
        else {
          changeGame();
        }
      }
    );  
    }
}



