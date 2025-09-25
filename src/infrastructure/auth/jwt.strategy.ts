import { Injectable, Logger } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger('AuthService')

  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET')
    if (!secret) {
      throw new Error('JWT_SECRET is not defined')
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    })
  }

  validate(payload: { email: string; userName: string }) {
    return { email: payload.email, userName: payload.userName }
  }
}
