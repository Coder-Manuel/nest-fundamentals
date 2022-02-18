import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDTO } from './dto';
import { Attendance } from './entities';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}
  //
  //* ========== POST REQUESTS ==========
  //
  //* ======= CREATE ATTENDANCE REQUEST ========
  @ApiCreatedResponse({ type: Attendance })
  @Post('create')
  async createAttendance(
    @Body() attendance: CreateAttendanceDTO,
  ): Promise<any> {
    return await this.attendanceService.createAttendance(attendance);
  }
}
