import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller'
import { UsersController } from './controllers/users.controller'
import { ApplicationModule } from '../application/application.module'

@Module({
  imports: [ApplicationModule],
  controllers: [AuthController, UsersController],
  providers: [],
})
export class ApiModule {}
