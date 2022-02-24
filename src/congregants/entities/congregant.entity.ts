import { ApiProperty } from '@nestjs/swagger';
import { Attendance } from 'src/attendance/entities';
import { HomeFellowship } from 'src/home-fellowship/entities';
import { UserBaseEntity } from 'src/utilities/entities';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';

@Entity('congregants')
@Unique('unique_congregant_key', [
  'firstName',
  'lastName',
  'mobile',
  'residence',
])
export class Congregant extends UserBaseEntity {
  @Column({
    name: 'national_id',
    nullable: true,
    select: false, // * Hide the id because it's a sensitive information.
  })
  national_ID?: string;

  @ApiProperty()
  @Column()
  residence: string;

  @ApiProperty()
  @Column({ nullable: true })
  age?: number;

  @ApiProperty()
  @Column()
  vaccinated: boolean;

  @ApiProperty({ type: Attendance, isArray: true })
  @OneToMany(() => Attendance, (attendance) => attendance.user, {
    cascade: true,
  })
  attendances: Attendance[];

  @ManyToOne(() => HomeFellowship, (fellowship) => fellowship.members, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  fellowship: string;
}
