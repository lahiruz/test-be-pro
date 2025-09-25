import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { ApiModule } from '../src/api/api.module'

describe('AuthController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'abc@gmail.com',
        password: '1234',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token')
        expect(res.body.access_token).toBeDefined()
      })
  })

  it('/auth/login (POST) without empty password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'abc@gmail.com',
        password: '',
      })
      .expect(401)
  })

  it('/auth/login (POST) without empty password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'abc@gmail.com',
        password: '',
      })
      .expect(401)
  })

  it('/auth/login (POST) without empty password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: '',
        password: '',
      })
      .expect(401)
  })
})
