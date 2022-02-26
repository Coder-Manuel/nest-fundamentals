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
import { CongregantsService } from 'src/congregants';
import ORMErrorHandler from 'src/utilities/error_handlers/orm_error_handler';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly congService: CongregantsService,
  ) {}

  /**
   * Get's all the users
   *
   *  @param { string } name - The firstname to be used in filtering
   */
  public async getUsers(name?: string): Promise<UserArrayResponse> {
    if (name) {
      const filteredUsers = await this.usersRepository.find({
        where: { email: name },
        relations: ['attendances_registered', 'details'],
      });

      return new UserArrayResponse(filteredUsers);
    }

    const users = await this.usersRepository.find({
      relations: ['attendances_registered', 'details'],
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
    const user = await this.findByID(id);

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
    const { email, congregant_id, username } = user;

    const cong = await this.congService.findById(congregant_id);

    if (!cong) {
      throw new NotFoundException({
        message: 'Entity not found',
        description: 'The congregant_id is NOT associated with any congregant',
      });
    }

    const newUser = this.usersRepository.create({
      email,
      details: cong,
      username: username,
      password: username,
    });

    try {
      const results = await this.usersRepository.save(newUser);

      // * Obscure the password from the response
      delete results.password;

      return new UserResponse(results);
    } catch (error) {
      // * This throws errors according to the error codes.
      ORMErrorHandler.handle(error, 'email');
    }
  }

  public async getUserByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
      select: ['id', 'email', 'username', 'password', 'createdAt', 'updatedAt'],
    });

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
      select: ['id', 'email', 'username', 'createdAt', 'updatedAt'],
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

  public async deleteUser(id: string) {
    const user = await this.findByID(id);

    return await this.usersRepository.delete(user);
  }

  /**
   *
   * @param { string } id - The id of the user to get.
   * @returns { User } - User found
   * @throws { NotFoundException } - When no user with the id is found
   */
  private async findByID(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
