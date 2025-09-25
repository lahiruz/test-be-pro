import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { ApiModule } from '../src/api/api.module'
import { UserRepository } from '../src/infrastructure/repositories/users.repository'

describe('UsersController (e2e)', () => {
  let app: INestApplication
  let loginToken: string = ''

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    const result = request(app.getHttpServer()).post('/auth/login').send({
      email: 'abc@gmail.com',
      password: '1234',
    })

    loginToken = (await result).body.access_token as string
  })

  beforeEach(async () => {
    if (!app) {
      throw new Error('app is not defined')
    }

    // Clear users collection using repository
    const userRepository = app.get(UserRepository)
    await userRepository.deleteAll()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${loginToken}`)
      .expect(200)
      .expect([])
  })
})
