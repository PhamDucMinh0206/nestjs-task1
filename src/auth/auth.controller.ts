import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  authService: any;
  @Post('/signUp')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.singUp(authCredentialDto);
  }
}
