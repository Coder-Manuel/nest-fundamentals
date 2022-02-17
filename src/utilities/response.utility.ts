import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  @ApiProperty()
  error: string;

  @ApiProperty()
  description: string;
}

export interface BaseResponse<Type> {
  response: Type;
}

export class Response<Type> implements BaseResponse<Type> {
  response: Type;

  @ApiProperty()
  message: string;
}
