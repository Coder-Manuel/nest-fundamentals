import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ORMErrorHandler from 'src/utilities/error_handlers/orm_error_handler';
import { Repository } from 'typeorm';
import { CreateFellowshipDTO } from './dto';
import { HomeFellowship } from './entities';

@Injectable()
export class HomeFellowshipService {
  constructor(
    @InjectRepository(HomeFellowship)
    private fellowshipRepo: Repository<HomeFellowship>,
  ) {}

  public async createFellowship(input: CreateFellowshipDTO): Promise<any> {
    const { name, meetup_place, leader } = input;

    const newFellowship = this.fellowshipRepo.create({
      name,
      meetup_place,
      leader,
    });

    try {
      const fellowship = await this.fellowshipRepo.save(newFellowship);

      return fellowship;
    } catch (error) {
      // * This throws errors according to the error codes.
      ORMErrorHandler.handle(error, 'fellowship');
    }
  }

  /**
   *
   * @param page The page from where data is being fetched.
   * @param limit The limit of the data to be fetched.
   * @returns {}
   */
  public async getFellowships(page: number, limit: number): Promise<any> {
    const fellowships = await this.fellowshipRepo.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['members', 'leader'],
    });

    return fellowships;
  }
}
