import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { VALIDATION_PIPES } from 'src/users/utilities';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDTO } from './dto';
import { Attendance } from './entities';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}
  //
  //? ========== POST REQUESTS ==========
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
  //? ========== GET REQUESTS ==========
  //
  //* ======= GET ALL ATTENDANCES ========
  @HttpCode(200)
  @ApiOkResponse({ type: Attendance, isArray: true })
  @Get()
  async getAttendance(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    return await this.attendanceService.getAllAttendance(page, limit);
  }

  //* ======= GET ALL ATTENDANCES FOR SINGLE CONGREGANT ========
  @HttpCode(200)
  @ApiOkResponse({ type: Attendance, isArray: true })
  @ApiParam({ name: 'id' })
  @Get(':id')
  async getSingleCongregantAttendance(
    @Param('id', VALIDATION_PIPES.UUID_PIPE) id: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    return await this.attendanceService.getAttendanceByCongregantId(
      id,
      page,
      limit,
    );
  }

  //* ======= GET ATTENDANCES OF SINGLE CONGREGANT WITH DATE FILTER ========
  @HttpCode(200)
  @ApiOkResponse({ type: Attendance, isArray: true })
  @ApiParam({ name: 'id' })
  @Get(':id/filter')
  async getDateFilterSingleAttendance(
    @Param('id', VALIDATION_PIPES.UUID_PIPE) id: string,
    @Query('date') date: string,
  ): Promise<any> {
    return await this.attendanceService.getFilteredAttendanceByCongregantId(
      id,
      date,
    );
  }
}
