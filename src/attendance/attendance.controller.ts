import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  //* ======= CREATE ATTENDANCE ========
  @ApiCreatedResponse({ type: Attendance })
  @Post('create')
  async createAttendance(
    @Body() attendance: CreateAttendanceDTO,
  ): Promise<any> {
    return await this.attendanceService.createAttendance(attendance);
  }

  //
  //* ========== GET REQUESTS ==========
  //
  //* ======= GET ATTENDANCES ========
  @HttpCode(200)
  @ApiOkResponse({ type: Attendance, isArray: true })
  @Get()
  async getAttendance(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    return await this.attendanceService.getAllAttendance(page, limit);
  }
}
