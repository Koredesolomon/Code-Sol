import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from "./jwt.interface.payload";
import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from './users.entity';
import { Repository } from "typeorm";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'mysecret15',
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const users = await this.userRepo.findOne({ where: { email: email } })

        if (!users) {
            throw new HttpException({
                message: ["Unauthorized access"],
                statusCode: 401,
            }, 401);
        }
        else {
            return users;
        }
    }
}