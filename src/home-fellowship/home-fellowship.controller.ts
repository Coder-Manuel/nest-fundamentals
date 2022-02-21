import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { VALIDATION_PIPES } from 'src/users/utilities';
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
  //* ======= CREATE FELLOWSHIP ========
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

  //
  //* ========== PUT REQUESTS ==========
  //
  //* ======= SET FELLOWSHIP LEADER ========
  @ApiCreatedResponse({ type: HomeFellowship })
  @ApiQuery({ name: 'leader' })
  @Put(':id')
  async setFellowshipLeader(
    @Param('id', VALIDATION_PIPES.UUID_PIPE) id: string,
    @Query('leader', VALIDATION_PIPES.UUID_PIPE) leader: string,
  ): Promise<any> {
    return await this.fellowshipService.setFellowshipLeader(id, leader);
  }
}
