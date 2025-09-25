import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserRequest {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string
}
