import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './entities';
import { AttendanceService } from './attendance.service';
import { CongregantsModule } from 'src/congregants';

@Module({
  controllers: [AttendanceController],
  imports: [TypeOrmModule.forFeature([Attendance]), CongregantsModule],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
