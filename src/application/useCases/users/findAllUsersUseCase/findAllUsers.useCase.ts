import { Logger } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindAllUsersQuery } from './findAllUsers.query'
import { UserRepository } from '../../../../infrastructure/repositories/users.repository'
import { UserMapper } from '../../../mappers/user.mapper'
import { UserResponse } from '../../../../models/users/user.response'

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersUseCase implements IQueryHandler<FindAllUsersQuery> {
  private readonly logger = new Logger(FindAllUsersUseCase.name)

  constructor(private readonly usersRepository: UserRepository) {}

  public async execute(): Promise<UserResponse[]> {
    this.logger.debug('executing FindAllUsersUseCase')
    const users = await this.usersRepository.findAll()
    return users.map((user) => UserMapper.toResponse(user))
  }
}
