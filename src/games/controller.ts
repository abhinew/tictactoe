// src/pages/controller.ts
import { JsonController, Get, Param, Put, Body, NotFoundError, HttpCode, Post, BodyParam } from 'routing-controllers'
import Game from './entity'
import { validate } from 'class-validator';


@JsonController()
export default class GameController {
    @Post('/games')
    @HttpCode(201)
    createGame(@Param('name') name: string) { 
      console.log(name);
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
    async updateGame(
      @Param('id') id: number,
      @Body() update: Partial<Game>
    ) {
      console.log(update.name);
      console.log(id);
      validate(update.name).then(errors => {
        async function changeGame () {
          const game = await Game.findOne(id);
          if(!game)  throw new NotFoundError('Cannot find game');
          return Game.merge(game, update).save();
        }
        if (errors.length > 0) return 
        else {
          changeGame();
        }
      }
    );   
    }


}



