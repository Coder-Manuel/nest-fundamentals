import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CongregantsService } from 'src/congregants';
import { CreateCongregantDTO } from 'src/congregants/dto';
import { Repository } from 'typeorm';
import { NAttendance } from './entities/nma-attendance.entity';

@Injectable()
export class NmaService {
  constructor(
    @InjectRepository(NAttendance, 'prod')
    private readonly repository: Repository<NAttendance>,
    private readonly congService: CongregantsService,
  ) {}

  /**
   *
   * @param page The page number
   * @param limit The number of users to transfer
   * @returns
   */
  public async transferCongregants(page: number, limit: number): Promise<any> {
    const attendances = await this.repository.find({
      take: limit,
      skip: (page - 1) * limit,
    });

    const start = Date.now();

    try {
      const congregant = new CreateCongregantDTO();

      attendances.forEach(async (element) => {
        congregant.firstName = element.firstName;
        congregant.lastName = element.otherName;
        congregant.mobile = element.phone;
        congregant.age = element.age;
        congregant.national_ID = element.nationalID;
        congregant.residence = element.residence;
        congregant.vaccinated = element.vaccinated === 'Yes' ? true : false;

        await this.congService.createCongregant(congregant);
      });

      const end = Date.now();

      const time = `${(end - start) / 1000} seconds`;

      return {
        message: `Inserted ${attendances.length} new congregants`,
        execution_time: time,
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'An Error has occurred',
        description: error,
      });
    }
  }
}
