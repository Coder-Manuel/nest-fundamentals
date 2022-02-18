import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttendanceDTO } from './dto';
import { Attendance } from './entities';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
  ) {}

  public async createAttendance(input: CreateAttendanceDTO): Promise<any> {
    const { temperature, checked_in_by, user } = input;

    const newAttendance = this.attendanceRepo.create({
      temperature,
      checked_in_by,
      user,
    });

    const attendance = await this.attendanceRepo.save(newAttendance);

    return attendance;
  }
}
