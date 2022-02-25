import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('congregants')
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
  nationalID: string;

  @Column()
  department: string;

  @Column({ name: 'home_fellowship' })
  homeFellowship: string;

  @Column()
  created_at: string;

  @Column()
  vaccinated: string;
}
