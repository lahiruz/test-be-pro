import { UserRequest } from '../../../../models/users/user.request'

export class CreateUserCommand {
  constructor(public readonly request: UserRequest) {}
}
