import { UserResponse } from '../../models/users/user.response'
import { UserDocument } from '../../schemas/user.schema'

export class UserMapper {
  public static toResponse(src: UserDocument): UserResponse {
    return {
      id: src._id as string,
      name: src.name ?? '',
      email: src.email ?? '',
    }
  }
}
