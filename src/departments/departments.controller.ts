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
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDTO } from './dto';
import { Department } from './entities';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private departmentService: DepartmentsService) {}
  //
  // ? ========== GET REQUESTS ==========

  // * ========== GET ALL DEPARTMENTS ==========
  @HttpCode(200)
  @ApiOkResponse({ type: Department, isArray: true })
  @Get()
  async getDepartments(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    return this.departmentService.getAllDepartments(page, limit);
  }

  // * ========== GET DEPARTMENT BY ID ==========
  @HttpCode(200)
  @ApiOkResponse({ type: Department })
  @Get(':id')
  async getDepartmentById(
    @Param('id', VALIDATION_PIPES.UUID_PIPE) id: string,
  ): Promise<any> {
    return this.departmentService.getDepartmentById(id);
  }

  // ? ========== POST REQUESTS ==========

  // * ========== CREATE DEPARTMENT ==========
  @ApiCreatedResponse({ type: Department })
  @Post('create')
  async createDepartment(
    @Body() department: CreateDepartmentDTO,
  ): Promise<any> {
    return await this.departmentService.createDepartment(department);
  }

  // ? ========== PUT REQUESTS ==========

  // * ========== SET DEPARTMENT LEADER ==========
  @HttpCode(200)
  @ApiOkResponse({ type: Department })
  @ApiQuery({ name: 'leader' })
  @Put(':id')
  async setDepartmentLeader(
    @Param('id', VALIDATION_PIPES.UUID_PIPE) id: string,
    @Query('leader', VALIDATION_PIPES.UUID_PIPE) leader: string,
  ): Promise<any> {
    return this.departmentService.setDepartmentLeader(id, leader);
  }
}
