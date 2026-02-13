import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RedisModule } from './modules/core/redis/redis.module';
import { PrismaModule } from './modules/core/prisma/prisma.module';
import { AmqpModule } from './modules/core/amqp/amqp.module';

@Module({
  imports: [
    RedisModule,
    AmqpModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
