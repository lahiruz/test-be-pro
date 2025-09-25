import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common'
import { AuthRequest } from '../../models/auth/auth.request'
import { AuthTokenResponse } from '../../models/auth/authToken.response'
import { CommandBus } from '@nestjs/cqrs'
import { UserLoginCommand } from '../../application/useCases/auth/userLoginUseCase/userLogin.command'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() request: AuthRequest): Promise<AuthTokenResponse> {
    this.logger.debug(`authenticating user ${request.email}`)
    const cmd = new UserLoginCommand(request.email, request.password)
    return await this.commandBus.execute<UserLoginCommand, AuthTokenResponse>(
      cmd,
    )
  }
}
