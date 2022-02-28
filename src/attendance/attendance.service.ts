import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CongregantsService } from 'src/congregants';
import { Repository } from 'typeorm';
import { CreateAttendanceDTO } from './dto';
import { Attendance } from './entities';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
    private readonly congregantService: CongregantsService,
  ) {}

  /**
   *
   * @param input CreateAttendanceDTO object.
   * @returns {}
   */
  public async createAttendance(input: CreateAttendanceDTO): Promise<any> {
    const { temperature, checked_in_by, user, date, time } = input;

    const newAttendance = this.attendanceRepo.create({
      temperature,
      checked_in_by,
      user,
      time: time,
      date: date,
    });

    // ? This code is used for transferring data only.
    const attendance = await this.attendanceRepo
      .createQueryBuilder()
      .insert()
      .into(Attendance)
      .values(newAttendance)
      .orIgnore()
      .execute();

    //const attendance = await this.attendanceRepo.save(newAttendance);

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

  public async getAttendanceByCongregantId(
    id: string,
    page: number,
    limit: number,
  ): Promise<any> {
    const congregant = await this.congregantService.findById(id);

    const attendance = await this.attendanceRepo.find({
      where: { user: congregant },
      take: limit | 1,
      skip: (page - 1) * limit,
      relations: ['checked_in_by'],
    });

    return attendance;
  }

  public async getFilteredAttendanceByCongregantId(
    id: string,
    date: string,
  ): Promise<any> {
    const congregant = await this.congregantService.findById(id);

    const attendance = await this.attendanceRepo.find({
      where: { user: congregant, date: date },
      relations: ['checked_in_by'],
    });

    return attendance;
  }
}
