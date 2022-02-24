import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NAttendance } from './entities/nma-attendance.entity';

@Injectable()
export class NmaService {
  constructor(
    @InjectRepository(NAttendance, 'prod')
    private readonly repository: Repository<NAttendance>,
  ) {}

  public async getAttendance(
    page: number,
    limit: number,
  ): Promise<NAttendance[]> {
    const attendances = await this.repository.find({
      take: limit,
      skip: (page - 1) * limit,
    });

    return attendances;
  }
}
