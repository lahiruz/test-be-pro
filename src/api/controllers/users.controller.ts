import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { UserResponse } from '../../models/users/user.response'
import { UserRequest } from '../../models/users/user.request'
import { AuthGuard } from '@nestjs/passport'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { UpdateUserByIdCommand } from '../../application/useCases/users/updateUserByIdUseCase/updateUserById.command'
import { DeleteUserCommand } from '../../application/useCases/users/deleteUserUseCase/deleteUser.command'
import { CreateUserCommand } from '../../application/useCases/users/createUserUseCase/createUser.command'
import { FindAllUsersQuery } from '../../application/useCases/users/findAllUsersUseCase/findAllUsers.query'
import { GetUserByIdQuery } from '../../application/useCases/users/getUserByIdUseCase/getUserById.query'

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name)

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsers(): Promise<UserResponse[]> {
    this.logger.debug('getting all users')
    const query = new FindAllUsersQuery()
    return await this.queryBus.execute<FindAllUsersQuery, UserResponse[]>(query)
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Param('id') id: string): Promise<UserResponse | undefined> {
    this.logger.debug(`getting user details by ${id}`)
    const query = new GetUserByIdQuery(id)
    return await this.queryBus.execute<GetUserByIdQuery, UserResponse>(query)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addUser(
    @Body() request: UserRequest,
  ): Promise<UserResponse | undefined> {
    this.logger.debug('creating new user', request)
    const cmd = new CreateUserCommand({
      email: request.email,
      name: request.name,
    })
    return await this.commandBus.execute<CreateUserCommand, UserResponse>(cmd)
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('id') id: string,
    @Body() request: UserRequest,
  ): Promise<UserResponse> {
    this.logger.debug(`updating user ${id}`, request)

    const cmd = new UpdateUserByIdCommand(id, {
      email: request.email,
      name: request.name,
    })
    return await this.commandBus.execute<UpdateUserByIdCommand, UserResponse>(
      cmd,
    )
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id') id: string): Promise<void> {
    this.logger.debug(`deleting user ${id}`)
    const cmd = new DeleteUserCommand(id)
    return await this.commandBus.execute<DeleteUserCommand, void>(cmd)
  }
}
