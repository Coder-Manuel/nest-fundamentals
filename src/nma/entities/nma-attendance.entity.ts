import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attendance')
export class NAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'other_name' })
  otherName: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column()
  residence: string;

  @Column({ name: 'national_id' })
  natID: string;

  @Column()
  department: string;

  @Column({ name: 'home_fellowship' })
  homeFellowship: string;

  @Column()
  temperature: number;

  @Column({ name: 'checked_in_by' })
  checked_in_by: string;

  @Column()
  date: string;

  @Column()
  time: string;
}
