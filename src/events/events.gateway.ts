import {
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'net';

export class EventsGateway {
  @SubscribeMessage('room-connection')
  handleEvent(
    @MessageBody('room-id') id: string,
    @ConnectedSocket() client: Socket,
  ): object {
    const event = 'room-connection';
    client.emit('room-id', { id });
    return { event, id };
  }
}
export default EventsGateway;
