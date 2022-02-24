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

@Entity('home_fellowships')
@Unique('unique_fellowship_key', ['name'])
export class HomeFellowship extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  meetup_place: string;

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
