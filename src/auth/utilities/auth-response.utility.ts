import { ApiProperty } from '@nestjs/swagger';
import { Response } from 'src/utilities';
import { LoginResponseDTO } from '../dto';

export class LoginSuccessResponse extends Response<LoginResponseDTO> {
  constructor(_response: LoginResponseDTO) {
    super();
    this.response = _response;
    this.message = 'Success';
  }
  @ApiProperty()
  response: LoginResponseDTO;
}
