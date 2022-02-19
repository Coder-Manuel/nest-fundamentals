import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateFellowshipDTO } from './dto';
import { HomeFellowship } from './entities';
import { HomeFellowshipService } from './home-fellowship.service';

@ApiTags('Home Fellowship')
@Controller('fellowship')
export class HomeFellowshipController {
  constructor(private fellowshipService: HomeFellowshipService) {}

  //
  //* ========== POST REQUESTS ==========
  //
  //* ======= CREATE ATTENDANCE ========
  @ApiCreatedResponse({ type: HomeFellowship })
  @Post('create')
  async createFellowship(@Body() input: CreateFellowshipDTO): Promise<any> {
    return this.fellowshipService.createFellowship(input);
  }
  //
  //* ========== GET REQUESTS ==========
  //
  //* ======= GET FELLOWSHIPS ========
  @ApiOkResponse({ type: HomeFellowship, isArray: true })
  @HttpCode(200)
  @Get()
  async getFellowships(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    return this.fellowshipService.getFellowships(page, limit);
  }
}
