import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Question } from "../Question/Question.entity";
import { Answer } from "../Question/answer.entity";

export const typeOrmconfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'akorede2001',
    database: 'codesol',
    entities: [User, Question, Answer],
    synchronize: true,
}