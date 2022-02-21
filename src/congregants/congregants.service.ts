import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ORMErrorHandler from 'src/utilities/error_handlers/orm_error_handler';
import { Repository } from 'typeorm';
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
      relations: ['attendances', 'fellowship'],
    });

    return congregants;
  }

  /**
   *
   * @param input  The congregant input dto
   * @returns {}
   */
  public async createCongregant(
    input: CreateCongregantDTO,
  ): Promise<Congregant> {
    const congregant = this.congRepository.create(input);

    try {
      const newCongregant = await this.congRepository.save(congregant);

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
    const cong = await this.congRepository.find({ id: id });

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
}
