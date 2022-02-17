import { Body, HttpCode } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { LoginSuccessResponse } from './utilities';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOkResponse({ type: LoginSuccessResponse })
  @HttpCode(200)
  @Post('login')
  async loginUser(@Body() loginDto: LoginDTO): Promise<LoginSuccessResponse> {
    return await this.authService.login(loginDto);
  }
}
