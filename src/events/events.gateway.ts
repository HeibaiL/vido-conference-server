import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @SubscribeMessage('connection')
  handleMessage(client: Socket, payload: string): void {
    client.emit('stream', 'blabla');
  }
}

export default EventsGateway;
