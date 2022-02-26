import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAttendanceDTO {
  @ApiProperty({ description: "The congregant's id" })
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @ApiProperty({ description: "The attendance clerk's id" })
  @IsNotEmpty()
  @IsUUID()
  checked_in_by: string;

  @ApiProperty({ description: 'The temperature value' })
  @IsNotEmpty()
  temperature: string;

  @ApiProperty({ description: 'The vaccination status of the congregant' })
  vaccinated: boolean;

  @ApiProperty({ description: "The congregant's home fellowship id" })
  homeFellowship?: string;

  @ApiProperty({ description: "The congregant's department id" })
  department?: string;

  created_at: string;

  time: string;
}
