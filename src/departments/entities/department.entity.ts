import { ApiProperty } from '@nestjs/swagger';
import { Congregant } from 'src/congregants/entities';
import { BaseEntity } from 'src/utilities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';

@Entity('departments')
@Unique('unique_department_key', ['name'])
export class Department extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @JoinColumn()
  @OneToOne(() => Congregant, (congregant) => congregant.id, {
    onDelete: 'SET NULL',
  })
  @ApiProperty()
  leader: string;

  @OneToMany(() => Congregant, (congregant) => congregant.fellowship)
  @ApiProperty()
  members: Congregant[];
}
