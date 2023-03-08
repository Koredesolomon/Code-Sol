import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CredentialsDto } from './dto/Credentials.dto';
import { LoginCredentialsDto } from './dto/login.credentialsDto';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('/signup')
  SignUp(
    @Body(ValidationPipe) credentialsDto: CredentialsDto,
  ): Promise<{ message }> {
    return this.UsersService.SignUp(credentialsDto);
  }

  @Post('/signin')
  SignIn(
    @Body(ValidationPipe) logincredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.UsersService.SignIn(logincredentialsDto);
  }
}
