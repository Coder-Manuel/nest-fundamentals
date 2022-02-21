import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateFellowshipDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  meetup_place: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  leader?: string;
}
