import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { BaseEntity } from '..';

export abstract class UserBaseEntity extends BaseEntity {
  @Column({ name: 'first_name' })
  @ApiProperty()
  firstName: string;

  @Column({ name: 'last_name' })
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  mobile: string;
}
