import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/utilities/entities';
import { Attendance } from 'src/attendance/entities';
import { Congregant } from 'src/congregants/entities';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ unique: true, select: false })
  @ApiProperty()
  username: string;

  @OneToOne(() => Congregant, (congregant) => congregant.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @ApiProperty({ type: Congregant })
  details: Congregant;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Attendance, (attendance) => attendance.checked_in_by, {
    cascade: true,
  })
  attendances_registered: Attendance[];

  @BeforeInsert()
  async setPassword() {
    this.password = bcrypt.hashSync(this.password, 15);
  }
}
