import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { InfrastructureModule } from '../infrastructure/infrastructure.module'
import { UserLoginUseCase } from './useCases/auth/userLoginUseCase/userLogin.useCase'
import { CqrsModule } from '@nestjs/cqrs'
import { UpdateUserByIdUseCase } from './useCases/users/updateUserByIdUseCase/updateUserById.useCase'
import { CreateUserUseCase } from './useCases/users/createUserUseCase/createUser.useCase'
import { DeleteUserUseCase } from './useCases/users/deleteUserUseCase/deleteUser.useCase'
import { GetUserByIdUseCase } from './useCases/users/getUserByIdUseCase/getUserById.useCase'
import { FindAllUsersUseCase } from './useCases/users/findAllUsersUseCase/findAllUsers.useCase'

@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
  ],
  controllers: [],
  providers: [
    // Auth
    UserLoginUseCase,

    // Users
    FindAllUsersUseCase,
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserByIdUseCase,
    DeleteUserUseCase,
  ],
  exports: [InfrastructureModule, ConfigModule, CqrsModule],
})
export class ApplicationModule {}
