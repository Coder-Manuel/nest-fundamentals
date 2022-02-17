import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users';
import { LoginDTO, LoginResponseDTO } from './dto';
import { LoginSuccessResponse } from './utilities';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(credentials: LoginDTO): Promise<LoginSuccessResponse> {
    const user = await this.usersService.verifyLoginCredentials(
      credentials.username,
      credentials.password,
    );

    const payload = { sub: user.id };

    const token = this.jwtService.sign(payload);

    const res = new LoginResponseDTO(user, token);

    return new LoginSuccessResponse(res);
  }
}
