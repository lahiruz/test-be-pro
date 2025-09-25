import { Logger, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserByIdCommand } from './updateUserById.command'
import { UserRepository } from '../../../../infrastructure/repositories/users.repository'
import { UserMapper } from '../../../mappers/user.mapper'
import { UserResponse } from '../../../../models/users/user.response'

@CommandHandler(UpdateUserByIdCommand)
export class UpdateUserByIdUseCase
  implements ICommandHandler<UpdateUserByIdCommand>
{
  private readonly logger = new Logger(UpdateUserByIdUseCase.name)

  constructor(private readonly usersRepository: UserRepository) {}

  public async execute(command: UpdateUserByIdCommand): Promise<UserResponse> {
    const { id, request } = command
    this.logger.debug('executing UpdateUserByIdUseCase')
    const user = await this.usersRepository.update(
      id,
      request.name,
      request.email,
    )

    if (!user) {
      throw new NotFoundException(`user is not found for ${id}`)
    }

    return UserMapper.toResponse(user)
  }
}
