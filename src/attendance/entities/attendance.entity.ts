import { Congregant } from 'src/congregants/entities';
import { User } from 'src/users/entities';
import { BaseEntity } from 'src/utilities';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('attendance')
export class Attendance extends BaseEntity {
  @Column()
  temperature: string;

  @Column()
  time: string;

  @ManyToOne(() => User, (user) => user.attendances_registered, {
    onDelete: 'SET NULL',
  })
  checked_in_by: string;

  @ManyToOne(() => Congregant, (congregant) => congregant.attendances, {
    onDelete: 'CASCADE',
  })
  user: string;
}
