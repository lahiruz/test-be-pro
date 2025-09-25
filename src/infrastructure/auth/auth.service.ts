import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthTokenResponse } from '../../models/auth/authToken.response'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(private readonly jwtService: JwtService) {}

  login(email: string, password: string): AuthTokenResponse {
    this.logger.debug('verifying credentials')
    const userName = 'admin'
    const savedEmail = 'abc@gmail.com'
    const savedPassword = '1234'

    if (email === savedEmail && savedPassword === password) {
      return {
        access_token: this.jwtService.sign({
          email,
          userName,
        }),
      }
    }

    throw new UnauthorizedException('invalid credentials')
  }
}
