import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'janedoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The mobile of the user',
    example: 'xxx 521 785 698',
  })
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'xxxyyyzzz',
  })
  @IsNotEmpty()
  password: string;
}
