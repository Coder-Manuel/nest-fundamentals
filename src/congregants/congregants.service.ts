import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ORMErrorHandler from 'src/utilities/error_handlers/orm_error_handler';
import { Like, Repository } from 'typeorm';
import { CreateCongregantDTO } from './dto';
import { Congregant } from './entities';

@Injectable()
export class CongregantsService {
  constructor(
    @InjectRepository(Congregant)
    private readonly congRepository: Repository<Congregant>,
  ) {}

  /**
   *
   * @param page: The page to fetch.
   * @param limit: The number of entities to fetch.
   * @returns {}
   */
  public async getAllCongregants(
    page: number,
    limit: number,
  ): Promise<Congregant[]> {
    const congregants = await this.congRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['attendances', 'fellowship', 'department'],
    });

    return congregants;
  }

  public async getCongregant(query: string): Promise<Congregant[]> {
    const congregant = await this.congRepository.find({
      where: [
        { firstName: Like(`%${query}%`) },
        { lastName: Like(`%${query}%`) },
        { mobile: Like(`%${query}%`) },
        { national_ID: Like(`%${query}%`) },
      ],
      relations: ['attendances', 'fellowship', 'department'],
    });

    return congregant;
  }

  public async getCongregantByNameMobile(
    fName: string,
    lName: string,
    mobile: string,
  ): Promise<Congregant[]> {
    const congregant = await this.congRepository.find({
      where: {
        firstName: fName,
        lastName: lName,
        mobile: mobile,
      },
      relations: ['attendances', 'fellowship', 'department'],
    });

    return congregant;
  }

  /**
   *
   * @param input  The congregant input dto
   * @returns {}
   */
  public async createCongregant(input: CreateCongregantDTO): Promise<any> {
    const congregant = this.congRepository.create(input);

    try {
      const newCongregant = await this.congRepository
        .createQueryBuilder()
        .insert()
        .into(Congregant)
        .values(congregant)
        .orIgnore()
        .execute();

      return newCongregant;
    } catch (error) {
      // * This throws errors according to the error codes.
      ORMErrorHandler.handle(error, 'congregant');
    }
  }

  /**
   *
   * @param id The id of the congregant
   * @param fellowship The id of the fellowship
   * @returns {}
   */
  public async addFellowship(id: string, fellowship: string): Promise<any> {
    const cong = await this.findById(id);

    if (!cong) {
      throw new NotFoundException({
        message: 'Not Found',
        description: 'The congregant is not registered',
      });
    }
    const newCongregant = this.congRepository.create({
      id: id,
      fellowship: fellowship,
    });
    try {
      const congregant = await this.congRepository.save(newCongregant);

      return congregant;
    } catch (error) {
      throw new BadRequestException({
        message: 'An Error Occurred',
        description: `${error}`,
      });
    }
  }

  public async addDepartment(depName: string, depID: string): Promise<any> {
    const cong = await this.congRepository.find({
      where: { dep_name: depName },
    });

    cong.forEach(async (element) => {
      const newCongregant = this.congRepository.create({
        id: element.id,
        department: depID,
      });

      await this.congRepository.save(newCongregant);
    });
  }

  /**
   *
   * @param id The id of the congregant
   * @returns Congregant
   */
  public async findById(id: string): Promise<Congregant> {
    const congregant = await this.congRepository.findOne({ id: id });

    return congregant;
  }
}
