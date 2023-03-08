import { Module } from '@nestjs/common';
import { QuestionController } from './Question.controller';
import { QuestionService } from './Question.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from './Question.entity';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Answer } from "./answer.entity";
import { AnswerService } from "./answer.service";

@Module({
  imports: [
 

  PassportModule.register({
      defaultStrategy:'jwt'
    }),
    JwtModule.register({
      secret: 'mysecret15',
      signOptions:{
        expiresIn: 86400,
      }
    }),
    TypeOrmModule.forFeature([Question,Answer]),
    UsersModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService,AnswerService]
})
export class QuestionModule { }
