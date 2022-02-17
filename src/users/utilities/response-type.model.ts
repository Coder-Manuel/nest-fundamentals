import { ApiProperty } from '@nestjs/swagger';
import { Response } from 'src/utilities/response.utility';
import { User } from '../entities/user.entity';

export class BadRequestResponse {
  @ApiProperty()
  error: string;

  @ApiProperty()
  description: string;
}

export class UserResponse extends Response<User> {
  constructor(_response: User) {
    super();
    this.response = _response;
    this.message = 'Success';
  }
  @ApiProperty()
  response: User;
}

export class UserArrayResponse extends Response<User[]> {
  constructor(_response: User[]) {
    super();
    this.response = _response;
    this.message = 'Success';
  }
  @ApiProperty({ isArray: true, type: User })
  response: User[];
}
