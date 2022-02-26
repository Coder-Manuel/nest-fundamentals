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
import { CongregantsService } from './congregants.service';
import { CreateCongregantDTO } from './dto';
import { Congregant } from './entities';

@ApiTags('Congregants')
@Controller('congregants')
export class CongregantsController {
  constructor(private congService: CongregantsService) {}

  // ? ======== GET REQUESTS ============

  // * ========== FETCH ALL CONGREGANTS ==========
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

  // * ========== SEARCH CONGREGANTS ==========
  @ApiOkResponse({ type: Congregant })
  @HttpCode(200)
  @ApiQuery({ name: 'query', type: String })
  @Get('search')
  async getCongregant(@Query('query') query: string): Promise<any> {
    return await this.congService.getCongregant(query);
  }

  // ? ======== POST REQUESTS ============

  // * ========== CREATE CONGREGANT ==========
  @ApiCreatedResponse({ type: Congregant })
  @Post('create')
  async createCongregant(@Body() input: CreateCongregantDTO): Promise<any> {
    return await this.congService.createCongregant(input);
  }

  // ? ======== PUT REQUESTS ============

  // * ========== ADD FELLOWSHIP TO CONGREGANT ==========
  @ApiOkResponse({ type: Congregant })
  @HttpCode(200)
  @Put(':id/addFellowship')
  async addFellowship(
    @Param('id', VALIDATION_PIPES.UUID_PIPE) id: string,
    @Query('fellowship', VALIDATION_PIPES.UUID_PIPE) fellowship: string,
  ): Promise<any> {
    return await this.congService.addFellowship(id, fellowship);
  }

  // * ========== ADD DEPARTMENT TO CONGREGANT ==========
  @ApiOkResponse({ type: Congregant })
  @HttpCode(200)
  @Put(':depName/addDepartment')
  async addDepartment(
    @Param('depName') depName: string,
    @Query('depID', VALIDATION_PIPES.UUID_PIPE) depID: string,
  ): Promise<any> {
    return await this.congService.addDepartment(depName, depID);
  }
}
