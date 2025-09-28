# Test BE Pro

A NestJS backend application implementing Clean Architecture with CQRS pattern, JWT authentication, and MongoDB integration.

## Description

This project is a professional backend application built with NestJS, following Clean Architecture principles and implementing the CQRS (Command Query Responsibility Segregation) pattern. It provides a robust foundation for scalable backend services with user management and authentication capabilities.

## Architecture

The project follows Clean Architecture principles with the following structure:

```
src/
├── api/                    # API Layer (Controllers)
├── application/           # Application Layer (Use Cases, Mappers)
├── infrastructure/        # Infrastructure Layer (Services, Repositories)
├── models/               # Request/Response Models
└── schemas/              # Database Schemas
```

## Features

- 🏗️ **Clean Architecture** - Separation of concerns with clear boundaries
- 🚀 **CQRS Pattern** - Command Query Responsibility Segregation
- 🔐 **JWT Authentication** - Secure token-based authentication
- 🗄️ **MongoDB Integration** - Document database with Mongoose
- ✅ **Validation** - Request validation with class-validator
- 🧪 **Testing** - Unit and E2E tests with Jest
- 📝 **TypeScript** - Full TypeScript support
- 🔍 **ESLint** - Code linting and formatting

## API Endpoints

### Authentication

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Users Management

All user endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token-here>
```

#### Get All Users

```http
GET /users
Authorization: Bearer <token>
```

#### Get User by ID

```http
GET /users/:id
Authorization: Bearer <token>
```

#### Create User

```http
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Update User

```http
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### Delete User

```http
DELETE /users/:id
Authorization: Bearer <token>
```

## Code Examples

### Authentication Controller

```typescript
import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common'
import { AuthRequest } from '../../models/auth/auth.request'
import { AuthTokenResponse } from '../../models/auth/authToken.response'
import { CommandBus } from '@nestjs/cqrs'
import { UserLoginCommand } from '../../application/useCases/auth/userLoginUseCase/userLogin.command'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() request: AuthRequest): Promise<AuthTokenResponse> {
    this.logger.debug(`authenticating user ${request.email}`)
    const cmd = new UserLoginCommand(request.email, request.password)
    return await this.commandBus.execute<UserLoginCommand, AuthTokenResponse>(cmd)
  }
}
```

### Request Validation

```typescript
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserRequest {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string
}
```

### CQRS Use Case Example

```typescript
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from './createUser.command'
import { UserResponse } from '../../../models/users/user.response'

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<UserResponse> {
    // Business logic implementation
    const user = await this.userRepository.create({
      name: command.name,
      email: command.email
    })
    
    return new UserResponse(user.id, user.name, user.email)
  }
}
```

## Environment Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Yarn package manager

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/test-be-pro

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Application
PORT=3000
NODE_ENV=development
```

## Project Setup

Install dependencies:

```bash
yarn install
```

## Running the Application

```bash
# Development mode
yarn start:dev

# Production mode
yarn build
yarn start:prod

# Debug mode
yarn start:debug
```

## Database Setup

Make sure MongoDB is running on your system. The application will automatically connect using the `MONGODB_URI` from your environment variables.

### MongoDB Connection Example

```typescript
// src/infrastructure/database/database.module.ts
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
```

## Testing

### Running Tests

```bash
# Unit tests
yarn test

# Watch mode
yarn test:watch

# End-to-end tests
yarn test:e2e

# Test coverage
yarn test:cov

# Debug tests
yarn test:debug
```

### Test Structure

```
test/
├── auth.e2e-spec.ts          # Authentication E2E tests
├── users.e2e-spec.ts         # Users E2E tests
├── jest-e2e.json            # E2E Jest configuration
└── factories/               # Test data factories
    ├── authRequest.builder.ts
    └── user.builder.ts
```

### Example Unit Test

```typescript
// src/application/useCases/users/createUserUseCase/createUser.useCase.spec.ts
describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase
  let repository: jest.Mocked<UserRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile()

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase)
    repository = module.get(UserRepository)
  })

  it('should create a user successfully', async () => {
    // Test implementation
    const command = new CreateUserCommand('John Doe', 'john@example.com')
    const expectedUser = { id: '1', name: 'John Doe', email: 'john@example.com' }
    
    repository.create.mockResolvedValue(expectedUser)
    
    const result = await useCase.execute(command)
    
    expect(result).toEqual(expectedUser)
    expect(repository.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com'
    })
  })
})
```

### Example E2E Test

```typescript
// test/users.e2e-spec.ts
describe('Users (e2e)', () => {
  let app: INestApplication
  let authToken: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    // Get auth token for protected endpoints
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(200)

    authToken = loginResponse.body.accessToken
  })

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true)
      })
  })

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Test User',
        email: 'test@example.com'
      })
      .expect(201)
  })
})
```

## Project Structure Details

### Clean Architecture Layers

#### API Layer (`src/api/`)

- **Controllers**: Handle HTTP requests and responses
- **DTOs**: Data transfer objects for request/response validation

#### Application Layer (`src/application/`)

- **Use Cases**: Business logic implementation following CQRS pattern
- **Commands**: Write operations (Create, Update, Delete)
- **Queries**: Read operations (Get, Find)
- **Mappers**: Transform data between layers

#### Infrastructure Layer (`src/infrastructure/`)

- **Repositories**: Data access implementations
- **Services**: External service integrations
- **Auth**: Authentication and authorization logic

### CQRS Implementation

The application uses the CQRS pattern to separate read and write operations:

```typescript
// Command Example
export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
  ) {}
}

// Query Example
export class GetUserByIdQuery {
  constructor(public readonly id: string) {}
}

// Handler Example
@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<UserResponse> {
    // Business logic here
  }
}
```

## Deployment

### Building for Production

```bash
# Build the application
yarn build

# Start production server
yarn start:prod
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN yarn install --only=production

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]
```

### Environment Configuration

Ensure all environment variables are properly set in production:

```bash
# Production environment variables
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-super-secure-production-secret
JWT_EXPIRES_IN=24h
```

### Health Checks

The application includes health check endpoints:

```typescript
// src/health/health.controller.ts
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok', timestamp: new Date().toISOString() }
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Write unit tests for new features
- Update documentation as needed
- Use meaningful commit messages
- Follow Clean Architecture principles

## Troubleshooting

### Common Issues

#### MongoDB Connection Error

```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Make sure MongoDB is running on your system or update the `MONGODB_URI` in your `.env` file.

#### JWT Secret Missing

```bash
Error: JWT secret is required
```

**Solution**: Add `JWT_SECRET` to your `.env` file with a secure random string.

#### Port Already in Use

```bash
Error: listen EADDRINUSE :::3000
```

**Solution**: Change the `PORT` in your `.env` file or kill the process using port 3000.

## Performance Considerations

- Use MongoDB indexes for frequently queried fields
- Implement proper pagination for large datasets
- Use DTOs for request validation to prevent malformed data
- Consider implementing caching for read-heavy operations
- Use connection pooling for database connections

## Security Best Practices

- Always validate input data using DTOs
- Use strong JWT secrets and rotate them regularly
- Implement rate limiting for API endpoints
- Use HTTPS in production
- Keep dependencies updated
- Implement proper error handling without exposing sensitive information

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - Document database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Passport** - Authentication middleware
- **Jest** - Testing framework
- **Class Validator** - Validation decorators
- **CQRS** - Command Query Responsibility Segregation

## License

This project is licensed under the UNLICENSED License.
