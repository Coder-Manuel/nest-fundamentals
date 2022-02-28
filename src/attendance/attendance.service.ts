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

  /**
   *
   * @param input CreateAttendanceDTO object.
   * @returns {}
   */
  public async createAttendance(input: CreateAttendanceDTO): Promise<any> {
    const { temperature, checked_in_by, user, created_at, time } = input;

    const newAttendance = this.attendanceRepo.create({
      temperature,
      checked_in_by,
      user,
      time: time,
      createdAt: created_at,
    });

    const attendance = await this.attendanceRepo.save(newAttendance);

    return attendance;
  }

  public async getAllAttendance(page: number, limit: number): Promise<any> {
    const attendance = await this.attendanceRepo.find({
      take: limit | 1,
      skip: (page - 1) * limit,
      relations: ['user', 'checked_in_by'],
    });

    return attendance;
  }
}
