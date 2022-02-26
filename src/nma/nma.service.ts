import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CongregantsService } from 'src/congregants';
import { CreateCongregantDTO } from 'src/congregants/dto';
import { Congregant } from 'src/congregants/entities';
import { Repository } from 'typeorm';
import { NAttendance, NCongregant } from './entities';

@Injectable()
export class NmaService {
  constructor(
    @InjectRepository(NCongregant, 'prod')
    private readonly repository: Repository<NCongregant>,

    @InjectRepository(NAttendance, 'prod')
    private readonly attendRepo: Repository<NAttendance>,

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
        congregant.createdAt = element.created_at;
        congregant.dep_name = element.department;

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

  public async transferAttendance(page: number, limit: number): Promise<any> {
    const cong = await this.congService.getAllCongregants(page, limit);

    return await this.getAttendance(cong);
  }

  private async getAttendance(congregants: Congregant[]) {
    const attendances = [];

    for (const element of congregants) {
      const att = await this.attendRepo.find({
        where: { firstName: element.firstName, otherName: element.lastName },
      });

      const attendance = { user: element, attendance: att };

      attendances.push(attendance);
    }

    return await Promise.all(attendances);
  }
}
