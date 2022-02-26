import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class NUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  username: string;
}
