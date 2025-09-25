import { Factory } from 'fishery'
import { UserRequest } from '../../src/models/users/user.request'
import { UserResponse } from '../../src/models/users/user.response'
import { UserDocument } from '../../src/schemas/user.schema'
import { ObjectId } from 'mongodb'

export const userRequestBuilder = Factory.define<UserRequest>(
  (): UserRequest => {
    return {
      email: 'abc@gmail.com',
      name: 'John Doe',
    }
  },
)

export const userResponseBuilder = Factory.define<UserResponse>(
  (): UserResponse => {
    return {
      id: '1',
      email: 'abc@gmail.com',
      name: 'John Doe',
    }
  },
)

export const UserDocumentBuilder = Factory.define<UserDocument>(
  (): UserDocument => {
    return {
      _id: new ObjectId(),
      email: 'abc@gmail.com',
      name: 'John Doe',
    } as UserDocument
  },
)
