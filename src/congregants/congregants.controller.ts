import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CongregantsService } from './congregants.service';
import { CreateCongregantDTO } from './dto';
import { Congregant } from './entities';

@ApiTags('Congregants')
@Controller('congregants')
export class CongregantsController {
  constructor(private congService: CongregantsService) {}

  @ApiOkResponse({ type: Congregant, isArray: true })
  @HttpCode(200)
  @ApiQuery({ name: 'limit', type: Number })
  @ApiQuery({ name: 'page', type: Number })
  @Get()
  async getAllCongregants(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ): Promise<any> {
    return await this.congService.getAllCongregants(page, limit);
  }

  @ApiCreatedResponse({ type: Congregant })
  @Post('create')
  async createCongregant(@Body() input: CreateCongregantDTO): Promise<any> {
    return await this.congService.createCongregant(input);
  }
}
