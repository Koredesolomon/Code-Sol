import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionDto{
    @IsNotEmpty()
    @IsString()
    content: string;
}