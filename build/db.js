"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entity_1 = require("./games/entity");
exports.default = () => typeorm_1.createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:1234/postgres',
    entities: [
        entity_1.default
    ],
    synchronize: true,
    logging: true,
})
    .then(_ => console.log('Connected to Postgres with TypeORM'));
