import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';

export class CreateCongregantDTO {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsPhoneNumber('KE')
  mobile?: string;

  @ApiProperty()
  national_ID?: string;

  @ApiProperty()
  @IsNotEmpty()
  residence: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Provide age as a number' })
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  vaccinated: boolean;
}
