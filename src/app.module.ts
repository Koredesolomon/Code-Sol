import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmconfig } from './config/typeOrm.config';
import { QuestionModule } from './Question/Question.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmconfig),
    UsersModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
