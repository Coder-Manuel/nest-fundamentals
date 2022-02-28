import { Congregant } from 'src/congregants/entities';
import { User } from 'src/users/entities';
import { BaseEntity } from 'src/utilities';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

@Entity('attendance')
@Unique('unique_attendance_key', ['user', 'date'])
export class Attendance extends BaseEntity {
  @Column()
  temperature: string;

  @Column({ type: 'time', default: () => 'NOW()' })
  time: string;

  @ManyToOne(() => User, (user) => user.attendances_registered, {
    onDelete: 'SET NULL',
  })
  checked_in_by: string;

  @ManyToOne(() => Congregant, (congregant) => congregant.attendances, {
    onDelete: 'CASCADE',
  })
  user: string;

  @Column({ name: 'date', type: 'date', default: () => 'NOW()' })
  date: string;
}
