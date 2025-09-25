import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteUserCommand } from './deleteUser.command'
import { UserRepository } from '../../../../infrastructure/repositories/users.repository'

@CommandHandler(DeleteUserCommand)
export class DeleteUserUseCase implements ICommandHandler<DeleteUserCommand> {
  private readonly logger = new Logger(DeleteUserUseCase.name)

  constructor(private readonly usersRepository: UserRepository) {}

  public async execute(command: DeleteUserCommand): Promise<void> {
    this.logger.debug('executing DeleteUserUseCase')

    return await this.usersRepository.delete(command.id)
  }
}
