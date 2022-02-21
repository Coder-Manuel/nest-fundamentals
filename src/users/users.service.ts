import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto';
import { User } from './entities';
import { UserArrayResponse, UserResponse } from './utilities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Get's all the users
   *
   *  @param { string } name - The firstname to be used in filtering
   */
  public async getUsers(name?: string): Promise<UserArrayResponse> {
    if (name) {
      const filteredUsers = await this.usersRepository.find({
        where: { firstName: name },
        relations: ['attendances_registered'],
      });

      return new UserArrayResponse(filteredUsers);
    }

    const users = await this.usersRepository.find({
      relations: ['attendances_registered'],
    });

    return new UserArrayResponse(users);
  }

  /**
   *
   * @param { string } id - The id of the user to get.
   * @returns { User } - User found
   * @throws { NotFoundException } - When no user with the id is found
   */
  public async getUserById(id: string): Promise<UserResponse> {
    const user = await this._findByID(id);

    if (!user) {
      throw new NotFoundException();
    }

    return new UserResponse(user);
  }

  /**
   * Creates a new user and saves to the database
   *
   * @param { CreateUserDTO } user - The create user dto.
   * @returns { User } - The user created.
   */
  public async createUser(user: CreateUserDTO): Promise<UserResponse> {
    const { firstName, lastName, email, mobile, password } = user;

    const newUser = this.usersRepository.create({
      firstName,
      lastName,
      email,
      mobile,
      password,
    });

    const results = await this.usersRepository.save(newUser);

    const usr = results;

    return new UserResponse(usr);
  }

  public async getUserByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: username },
      select: [
        'firstName',
        'lastName',
        'email',
        'mobile',
        'password',
        'createdAt',
        'updatedAt',
      ],
    });

    return user;
  }

  public async verifyLoginCredentials(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException({ error: 'No User Found' });
    }

    const validCredentials = await bcrypt.compare(password, user.password);

    if (!validCredentials) {
      throw new BadRequestException({ error: 'Password Used is Incorrect' });
    }

    delete user.password;

    return user;
  }

  /**
   *
   * @param { string } id - The id of the user to get.
   * @returns { User } - User found
   * @throws { NotFoundException } - When no user with the id is found
   */
  private async _findByID(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
