import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async loginUser(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return await this.authService.loginUser(loginUserDto);
  }
}
