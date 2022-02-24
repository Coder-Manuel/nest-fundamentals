import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NmaService } from './nma.service';

@ApiTags('NMA Api(s)')
@Controller('nma')
export class NmaController {
  constructor(private readonly service: NmaService) {}
  @Get('attendance')
  async getAttendance(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.service.getAttendance(page, limit);
  }
}
