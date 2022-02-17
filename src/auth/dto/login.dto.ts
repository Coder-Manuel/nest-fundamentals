import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities';

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDTO {
  constructor(_user: User, _token: string) {
    this.user = _user;
    this.token = _token;
  }
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
