import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SocketGateway } from 'src/socket/socket.gateway';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private socketGateway: SocketGateway,
  ) {
    // setInterval(() => {
    //   console.log('running set timeout');
    //   this.sendMessageToAllListeners({
    //     secret: 'message',
    //     instance: process.env.NODE_INSTANCE_ID,
    //   });
    //   this.sendMessageToUser('user456', {
    //     secret: 'data',
    //     instance: process.env.NODE_INSTANCE_ID,
    //   });
    // }, 10000);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  async sendMessageToUser(userId: string, message: any) {
    console.log('trigged sendMessageToUser');
    // only a specific user listening to 'message' event will get the message
    await this.socketGateway.sendMessageSpecificUser('message', {
      userId,
      message,
    });
  }

  async sendMessageToAllListeners(message: any) {
    console.log('trigged sendMessageToAllListeners');
    // all users listening to 'message' event will get the message
    this.socketGateway.sendMessageToAll('message', { message });
  }
}
