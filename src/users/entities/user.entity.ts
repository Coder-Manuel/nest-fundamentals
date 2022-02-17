import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/utilities';

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'first_name' })
  @ApiProperty()
  firstName: string;

  @Column({ name: 'last_name' })
  @ApiProperty()
  lastName: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  mobile: string;

  @Column({ select: false })
  @ApiProperty()
  password: string;

  @BeforeInsert()
  async setPassword() {
    this.password = bcrypt.hashSync(this.password, 15);
  }
}
