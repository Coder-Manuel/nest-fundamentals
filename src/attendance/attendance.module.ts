import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './entities';
import { AttendanceService } from './attendance.service';

@Module({
  controllers: [AttendanceController],
  imports: [TypeOrmModule.forFeature([Attendance])],
  providers: [AttendanceService],
})
export class AttendanceModule {}
