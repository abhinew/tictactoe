// src/pages/controller.ts
import { JsonController, Get, Param, Put, Body, NotFoundError, HttpCode, Post, BodyParam } from 'routing-controllers'
import Game from './entity'


@JsonController()
export default class GameController {
    @Post('/games')
    @HttpCode(201)
    createGame(@BodyParam("name") name: string) { 
       let game = new Game();
        game.name = name;
        game.color = 'red';
        game.board = [
          ['o', 'o', 'o'],
          ['o', 'o', 'o'],
          ['o', 'o', 'o']
        ]
        return game.save();

    }
    
   
}



