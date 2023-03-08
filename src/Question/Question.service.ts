import { Injectable, NotFoundException, Post } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from './Question.entity';
import { CreateQuestionDto } from "./dto/create.question.dto";
import { User } from "src/users/users.entity";
import { GetUser } from 'src/users/get-user.decorator';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepo: Repository<Question>) { }


    async createQuestion(CreateQuestionDto: CreateQuestionDto,
        user: User): Promise<Question> {
        const { content } = CreateQuestionDto;

        const question = new Question();
        question.content = content;
        question.datePosted = new Date().toISOString();
        question.dateUpdated = question.datePosted
        question.user = user;
        await question.save();

        delete question.user;

        return question;
    }

    async getQuestions(): Promise<Question[]> {
        const query = this.questionRepo.createQueryBuilder("question").orderBy("question.datePosted", "DESC").leftJoinAndSelect("question.user", "user");

        const question = await query.getMany();

        return question;
    }

    async getQuestion(id: number): Promise<Question> {
        const found = await this.questionRepo.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`Sorry, the question with Id "${id}" was not found`);
        }
        else {
            return found;
        }
    }

    async getUserQuestion(userId: number): Promise<Question[]> {
        const found = await this.questionRepo.find({ where: { userId: userId } });

        if (!found) {
            throw new NotFoundException(`Sorry, the user with Id "${userId}" was not found`);
        }
        else {
            return found;
        }
    }


}