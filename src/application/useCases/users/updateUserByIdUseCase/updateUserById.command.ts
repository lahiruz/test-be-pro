import { UserRequest } from '../../../../models/users/user.request'

export class UpdateUserByIdCommand {
  constructor(
    public readonly id: string,
    public readonly request: UserRequest,
  ) {}
}
