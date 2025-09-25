import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from './createUser.command'
import { UserRepository } from '../../../../infrastructure/repositories/users.repository'
import { UserMapper } from '../../../mappers/user.mapper'
import { UserResponse } from '../../../../models/users/user.response'

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserUseCase.name)

  constructor(private readonly usersRepository: UserRepository) {}

  public async execute(command: CreateUserCommand): Promise<UserResponse> {
    const { request } = command
    this.logger.debug('executing CreateUserUseCase')
    const user = await this.usersRepository.create(request.name, request.email)
    return UserMapper.toResponse(user)
  }
}
