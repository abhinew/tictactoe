import { createConnection } from 'typeorm'
import Game from './games/entity';

export default () =>
createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:1234/postgres',
    entities: [
        Game
    ],
    synchronize: true,
    logging: true,

})
.then(_ => console.log('Connected to Postgres with TypeORM'))
