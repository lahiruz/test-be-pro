import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth/auth.service'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './auth/jwt.strategy'
import { MongooseModule } from '@nestjs/mongoose'
import { UserEntity, UserSchema } from '../schemas/user.schema'
import { UserRepository } from './repositories/users.repository'

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  providers: [UserRepository, AuthService, JwtStrategy],
  exports: [AuthService, UserRepository],
})
export class InfrastructureModule {}
