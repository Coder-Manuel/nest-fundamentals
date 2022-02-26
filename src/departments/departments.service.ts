import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CongregantsService } from 'src/congregants';
import ORMErrorHandler from 'src/utilities/error_handlers/orm_error_handler';
import { Repository } from 'typeorm';
import { CreateDepartmentDTO } from './dto';
import { Department } from './entities';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    private readonly congregantService: CongregantsService,
  ) {}

  public async createDepartment(
    input: CreateDepartmentDTO,
  ): Promise<Department> {
    const department = this.departmentRepo.create(input);

    try {
      const newDepartment = await this.departmentRepo.save(department);

      return newDepartment;
    } catch (error) {
      // * This throws errors according to the error codes.
      ORMErrorHandler.handle(error, 'department');
    }
  }

  public async getAllDepartments(
    page: number,
    limit: number,
  ): Promise<Department[]> {
    const departments = await this.departmentRepo.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['leader', 'members'],
    });

    return departments;
  }

  public async getDepartmentById(id: string): Promise<Department> {
    return await this.findById(id);
  }

  public async setDepartmentLeader(
    id: string,
    leader: string,
  ): Promise<Department> {
    const department = await this.findById(id);

    const congregant = await this.congregantService.findById(leader);

    if (!congregant) {
      throw new NotFoundException({
        message: 'Leader not found',
        description: 'The leader should be a registered congregant',
      });
    }

    department.leader = leader;

    return await this.departmentRepo.save(department);
  }

  /**
   *
   * @param id The id of Department.
   * @returns Department
   * @throws NotFoundException
   */
  private async findById(id: string): Promise<Department> {
    const department = await this.departmentRepo.findOne(
      {
        id: id,
      },
      { relations: ['leader', 'members'] },
    );

    if (!department) {
      throw new NotFoundException({
        message: 'Department not found',
        description: 'The department with the given id is not registered',
      });
    }

    return department;
  }
}
