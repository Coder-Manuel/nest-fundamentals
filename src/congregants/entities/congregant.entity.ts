import { ApiProperty } from '@nestjs/swagger';
import { Attendance } from 'src/attendance/entities';
import { UserBaseEntity } from 'src/utilities/entities';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

@Entity('congregants')
@Unique('unique_congregant_key', [
  'firstName',
  'lastName',
  'mobile',
  'residence',
])
export class Congregant extends UserBaseEntity {
  @ApiProperty()
  @Column({ name: 'national_id', nullable: true })
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

  @OneToMany(() => Attendance, (attendance) => attendance.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  attendances: Attendance[];
}
