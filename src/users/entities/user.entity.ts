import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserBaseEntity } from 'src/utilities/entities';
import { Attendance } from 'src/attendance/entities';

@Entity('users')
export class User extends UserBaseEntity {
  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ select: false })
  @ApiProperty()
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
