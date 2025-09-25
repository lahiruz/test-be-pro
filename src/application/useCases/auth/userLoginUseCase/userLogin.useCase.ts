import { Logger } from '@nestjs/common'
import { AuthService } from '../../../../infrastructure/auth/auth.service'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserLoginCommand } from './userLogin.command'
import { AuthTokenResponse } from '../../../../models/auth/authToken.response'

@CommandHandler(UserLoginCommand)
export class UserLoginUseCase implements ICommandHandler<UserLoginCommand> {
  private readonly logger = new Logger(UserLoginUseCase.name)

  constructor(private readonly authService: AuthService) {}

  public async execute(command: UserLoginCommand): Promise<AuthTokenResponse> {
    this.logger.debug('handling user login')
    const userToken = this.authService.login(command.email, command.password)
    return Promise.resolve(userToken)
  }
}
