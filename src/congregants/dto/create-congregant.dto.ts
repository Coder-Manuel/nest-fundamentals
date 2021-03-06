import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsUUID,
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

  createdAt?: string;

  dep_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  fellowship: string;
}
