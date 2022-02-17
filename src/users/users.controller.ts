import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth';
import { CreateUserDTO } from './dto';
import { UsersService } from './users.service';
import {
  BadRequestResponse,
  UserArrayResponse,
  UserResponse,
  VALIDATION_PIPES,
} from './utilities';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: UserArrayResponse })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async getAllUsers(@Query('name') name?: string): Promise<UserArrayResponse> {
    return this.usersService.getUsers(name);
  }

  @ApiOkResponse({ type: UserArrayResponse })
  @ApiNotFoundResponse({
    description: 'No user found with the provided id',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: BadRequestResponse,
  })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get(':id')
  async getUserById(
    @Param('id', VALIDATION_PIPES.UUID_PIPE)
    id: string,
  ): Promise<UserResponse> {
    return this.usersService.getUserById(id);
  }

  @ApiCreatedResponse({ type: UserResponse })
  @Post('/create')
  async createUser(@Body() body: CreateUserDTO): Promise<UserResponse> {
    return this.usersService.createUser(body);
  }
}
