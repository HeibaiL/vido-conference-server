import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';

type GetRoomResponse = {
  roomId: string;
};

@Controller('/room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  getRoom(): GetRoomResponse {
    console.log('qq');
    return { roomId: this.roomService.generateRoomId() };
  }
}
