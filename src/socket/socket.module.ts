import { Global, Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Global()
@Module({
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
