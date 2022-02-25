import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NmaService } from './nma.service';

@ApiTags('NMA Api(s)')
@Controller('nma')
export class NmaController {
  constructor(private readonly service: NmaService) {}
  @Get('congregants/transfer')
  async transferCongregants(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.service.transferCongregants(page, limit);
  }
}
