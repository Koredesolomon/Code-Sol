import { BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";
import { User } from "src/users/users.entity";
import { Question } from "src/Question/Question.entity";

@Entity()
export class Answer extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'text'})
    reply: string;

    @Column({default: new Date().toISOString()})
    datePosted: string;

    @Column()
    userId: number;

    @Column()
    questionId: number;

    @Column({default: 0})
    vote: number = 0;

    @ManyToOne(type => User, user => user.answer, { eager: true })
    user: User;

    @ManyToOne(type => Question, question => question.answer, {eager: false})
    question: Question;
}