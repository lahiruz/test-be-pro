import { createMock } from '@golevelup/ts-jest'
import { UserRepository } from '../../../../infrastructure/repositories/users.repository'
import { UpdateUserByIdUseCase } from './updateUserById.useCase'
import {
  UserDocumentBuilder,
  userRequestBuilder,
} from '../../../../../test/factories/user.builder'
import { NotFoundException } from '@nestjs/common'

describe('UpdateUserByIdUseCase', () => {
  const mockUserRepository = createMock<UserRepository>()
  let updateUserByIdUseCase: UpdateUserByIdUseCase

  beforeEach(() => {
    jest.clearAllMocks()
    updateUserByIdUseCase = new UpdateUserByIdUseCase(mockUserRepository)
  })

  it('should update user by id', async () => {
    // -- Arrange
    const userId = 'user-id'
    const request = userRequestBuilder.build()
    const userDocument = UserDocumentBuilder.build()
    mockUserRepository.update.mockResolvedValue(userDocument)

    // -- Act
    const result = await updateUserByIdUseCase.execute({ id: userId, request })

    // -- Assert
    expect(mockUserRepository.update).toHaveBeenCalledTimes(1)
    expect(mockUserRepository.update).toHaveBeenCalledWith(
      userId,
      request.name,
      request.email,
    )
    expect(result).toEqual({
      id: userDocument._id as string,
      name: userDocument.name,
      email: userDocument.email,
    })
  })

  it('should throw if user not found', async () => {
    // -- Arrange
    const userId = 'user-id'
    const request = userRequestBuilder.build()
    mockUserRepository.update.mockResolvedValue(null)

    // -- Act
    await expect(
      updateUserByIdUseCase.execute({ id: userId, request }),
    ).rejects.toThrow(NotFoundException)

    // -- Assert
    expect(mockUserRepository.update).toHaveBeenCalledTimes(1)
    expect(mockUserRepository.update).toHaveBeenCalledWith(
      userId,
      request.name,
      request.email,
    )
  })
})
