import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/users.entity";
import { Answer } from "./answer.entity";

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @Column()
    datePosted: string;

    @Column()
    dateUpdated: string;

    @ManyToOne(type => User, user => user.question, { eager: true })
    user: User;

    @OneToMany(type => Answer, answer => answer.question, {eager: true})
    answer: Answer[];

    @Column()
    userId: number;
}