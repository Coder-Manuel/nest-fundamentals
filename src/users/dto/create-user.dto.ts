import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'The email of the user',
    example: 'janedoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The id of the congregant',
  })
  @IsNotEmpty()
  @IsUUID()
  congregant_id: string;
}
