import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsIn } from "class-validator";

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  game_id?: number

  @Column('text', {nullable:false})
  name: string

  @Column('text', {nullable:false})
  @IsIn(['red', 'magenta', 'blue', 'green', 'yellow'], {
    message: 'Choose any color from \'red\', \'magenta\', \'blue\', \'green\', \'yellow\''
  })
  color: string

  @Column('json', {nullable:false})
  board: string[][]
}