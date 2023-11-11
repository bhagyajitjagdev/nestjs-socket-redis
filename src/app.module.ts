import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { UserModule } from './modules/user/user.module';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      url: 'redis://redis:6379',
    });
    return {
      store: () => store,
      ttl: 86400000, // 1 Day = 24 * 60 * 60 * 1000 = 86,400,000 milliseconds.
    };
  },
};

@Module({
  imports: [SocketModule, CacheModule.registerAsync(RedisOptions), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
