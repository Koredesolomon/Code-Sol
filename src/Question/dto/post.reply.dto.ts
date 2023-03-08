import {IsNotEmpty, IsString } from "class-validator";

export class PostReplyDto{
    @IsNotEmpty()
    @IsString()
    reply: string;
}