import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceService } from 'src/attendance/attendance.service';
import { CreateAttendanceDTO } from 'src/attendance/dto';
import { CongregantsService } from 'src/congregants';
import { CreateCongregantDTO } from 'src/congregants/dto';
import { Congregant } from 'src/congregants/entities';
import { UsersService } from 'src/users';
import { CreateUserDTO } from 'src/users/dto';
import { Repository } from 'typeorm';
import { NAttendance, NCongregant, NUser } from './entities';

@Injectable()
export class NmaService {
  constructor(
    @InjectRepository(NCongregant, 'prod')
    private readonly repository: Repository<NCongregant>,

    @InjectRepository(NAttendance, 'prod')
    private readonly attendRepo: Repository<NAttendance>,

    @InjectRepository(NUser, 'prod')
    private readonly usersRepo: Repository<NUser>,

    private readonly congService: CongregantsService,

    private readonly usersService: UsersService,

    private readonly attendanceService: AttendanceService,
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

  public async transferUsers(page: number, limit: number): Promise<any> {
    const users = await this.usersRepo.find({
      take: limit,
      skip: (page - 1) * limit,
    });

    return await this.getUsers(users);
  }

  private async getAttendance(congregants: Congregant[]) {
    const start = Date.now();

    const attendances = [];

    for (const element of congregants) {
      const att = await this.attendRepo.find({
        where: { firstName: element.firstName, otherName: element.lastName },
      });

      for (const atn of att) {
        const usr = await this.usersRepo.findOne({
          where: { name: atn.checked_in_by },
        });
        const email = usr.email;

        const checked_in_by = await this.usersService.getUserByEmail(email);

        const createAttendance = new CreateAttendanceDTO();
        createAttendance.user = element.id;
        createAttendance.temperature = atn.temperature;
        createAttendance.checked_in_by = checked_in_by.id;
        createAttendance.created_at = atn.date;
        createAttendance.time = atn.time;

        this.attendanceService.createAttendance(createAttendance);
      }

      attendances.push(...att);
    }

    const end = Date.now();

    const time = `${(end - start) / 1000} seconds`;

    return await Promise.resolve({
      message: `Successfully registered ${attendances.length} attendances`,
      execution_time: time,
    });
  }

  private async getUsers(users: NUser[]) {
    const congregants = [];

    for (const element of users) {
      const names = element.name.split(' ');
      const cn = await this.congService.getCongregantByNameMobile(
        names[0],
        names[1],
        element.phone,
      );

      const usr = new CreateUserDTO();

      if (cn.length > 0) {
        usr.email = element.email;
        usr.congregant_id = cn[0].id;
        usr.username = element.username;

        await this.usersService.createUser(usr);
      }

      const cong = { user: element, congregant: cn };

      congregants.push(cong);
    }

    return await Promise.all(congregants);
  }
}
