import { UserDocumentBuilder } from '../../../test/factories/user.builder'
import { UserMapper } from './user.mapper'

describe('UserMapper', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should map the user document to user response', () => {
    // -- Arrange
    const request = UserDocumentBuilder.build()

    // -- Act
    const response = UserMapper.toResponse(request)

    // -- Assert
    expect(response).toEqual({
      id: request._id as string,
      name: request.name,
      email: request.email,
    })
  })
})
