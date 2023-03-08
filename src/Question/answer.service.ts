import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { PostReplyDto } from './dto/post.reply.dto';


@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private answerRepo: Repository<Answer>) { }

        async createReply(postReplyDto: PostReplyDto, questionId: number,
            user:User): Promise<Answer>{
            const {reply} = postReplyDto;

            const answer = new Answer();
            answer.reply = reply;
            answer.datePosted =  new Date().toISOString();
            answer.user = user;
            answer.questionId = questionId

            await answer.save();

            return answer;
        }

        async getAllReply(questionId: number): Promise<Answer[]>{
            const answer = this.answerRepo.findBy({ questionId });

            return answer;
        }
}
