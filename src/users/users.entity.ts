import { IsDate, IsPhoneNumber } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Question } from "src/Question/Question.entity";
import { Answer } from "../Question/answer.entity";


@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    phonenumber: string;

    @Column({ select: false })
    salt: string;

    @OneToMany(type => Question, question => question.user, { eager: false })
    question: Question[];

    @OneToMany(type => Answer, answer => answer.user, { eager: false })
    answer: Answer[];

    async validatePassword(password: string): Promise<Boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash == this.password;
    }
}    