import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CredentialsDto } from './dto/Credentials.dto';
import { LoginCredentialsDto } from './dto/login.credentialsDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private jwtservice: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async SignUp(CredentialsDto: CredentialsDto): Promise<{ message }> {
    const { firstname, lastname, email, phonenumber, password } =
      CredentialsDto;

    const users = new User();
    users.firstname = firstname;
    users.lastname = lastname;
    users.email = email;
    users.phonenumber = phonenumber;
    users.salt = await bcrypt.genSalt();
    users.password = await this.hashPassword(password, users.salt);

    try {
      await users.save();
      return { message: 'USer registered successfully' };
    } catch (error) {
      if (error.code == '23505') {
        //duplicate username
        throw new ConflictException(['email already exists']);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async SignIn(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUserpassword(loginCredentialsDto);

    if (!user) {
      throw new UnauthorizedException([
        'Invalid Login details provided, Please input the correct details',
      ]);
    }
    const JwtPayload = { email: user.email, firstname: user.firstname, lastname: user.lastname, phone: user.phonenumber };
    const accessToken = await this.jwtservice.sign(JwtPayload);

    return { accessToken };
  }

  async validateUserpassword(
    logincredentialsDto: LoginCredentialsDto,
  ): Promise<User> {
    const { email, password } = logincredentialsDto;
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect(['user.password', 'user.salt'])
      .getOne();
    if (email && (await user?.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
