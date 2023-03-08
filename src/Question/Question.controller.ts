import { Controller, Post, UseGuards, Body, Get, Param, Query } from '@nestjs/common';
import { QuestionService } from "./Question.service";
import { CreateQuestionDto } from "./dto/create.question.dto";
import { Question } from "./Question.entity";
import { User } from 'src/users/users.entity';
import { GetUser } from 'src/users/get-user.decorator';
import { AuthGuard } from '@nestjs/passport'
import { ParseIntPipe } from '@nestjs/common/pipes';
import { PostReplyDto } from "./dto/post.reply.dto";
import { Answer } from "./answer.entity";
import { AnswerService } from './answer.service';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService,
        private answerService: AnswerService) { }

    @Post()
    @UseGuards(AuthGuard())
    createQuestion(@Body() createQuestionDto: CreateQuestionDto,
        @GetUser() user: User): Promise<Question> {
        return this.questionService.createQuestion(createQuestionDto, user);
    }

    @Post("/:id/answer")
    @UseGuards(AuthGuard())
     answerQuestion(@Body() postReplyDto:PostReplyDto,@GetUser() user: User, @Param('id', ParseIntPipe) questionId: number,
       ): Promise<Answer> {
        return this.answerService.createReply(postReplyDto, questionId, user,);
    }

    @Get("/:id/reply")
    getAllReply(@Param('id', ParseIntPipe) questionId: number,): Promise<Answer[]> {
            return this.answerService.getAllReply(questionId);
    }

    @Get()
    getQuestions(@Query('userId') userId?: number): Promise<Question[]> {
        if (userId) {
            return this.questionService.getUserQuestion(userId);
        }
        return this.questionService.getQuestions();
    }

    @Get('/:id')
    getQuestion(@Param('id', ParseIntPipe) id: number): Promise<Question> {
        return this.questionService.getQuestion(id);
    }
}
