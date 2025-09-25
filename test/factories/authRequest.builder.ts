import { Factory } from 'fishery'
import { AuthRequest } from '../../src/models/auth/auth.request'

export const authRequestBuilder = Factory.define<AuthRequest>(
  (): AuthRequest => {
    return {
      email: 'abc@gmail.com',
      password: 'password',
    }
  },
)
