import { AuthController } from './auth.controller'
import { createMock } from '@golevelup/ts-jest'
import { CommandBus } from '@nestjs/cqrs'
import { authRequestBuilder } from '../../../test/factories/authRequest.builder'

describe('AuthController', () => {
  const mockCommandBus = createMock<CommandBus>()
  let controller: AuthController

  beforeEach(() => {
    jest.clearAllMocks()
    controller = new AuthController(mockCommandBus)
  })

  it('should call execute with login params', async () => {
    // -- Arrange
    const request = authRequestBuilder.build()

    // -- Act
    await controller.login(request)

    // -- Assert
    expect(mockCommandBus.execute).toHaveBeenCalledTimes(1)
    expect(mockCommandBus.execute).toHaveBeenCalledWith(request)
  })
})
