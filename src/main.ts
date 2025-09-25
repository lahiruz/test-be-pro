import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  logger.log(`Starting application now...`)

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors()

  await app.listen(process.env.PORT ?? 3000)
}

void bootstrap()
