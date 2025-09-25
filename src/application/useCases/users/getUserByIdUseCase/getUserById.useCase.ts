import { Logger, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetUserByIdQuery } from './getUserById.query'
import { UserRepository } from '../../../../infrastructure/repositories/users.repository'
import { UserMapper } from '../../../mappers/user.mapper'
import { UserResponse } from '../../../../models/users/user.response'

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdUseCase implements IQueryHandler<GetUserByIdQuery> {
  private readonly logger = new Logger(GetUserByIdUseCase.name)

  constructor(private readonly usersRepository: UserRepository) {}

  public async execute(query: GetUserByIdQuery): Promise<UserResponse> {
    this.logger.debug('executing GetUserByIdUseCase')
    const user = await this.usersRepository.getUser(query.id)

    if (!user) {
      throw new NotFoundException(`user is not found for ${query.id}`)
    }

    return UserMapper.toResponse(user)
  }
}
