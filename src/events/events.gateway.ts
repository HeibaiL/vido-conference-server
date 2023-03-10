import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @SubscribeMessage('connection')
  handleConnection(client: Socket, payload: string): void {
    const roomId = uuidv4();
    client.on('getRoom', () => {
      console.log('GetR');
      client.emit('getRoom', roomId);
    });
    client.on('joinRoom', (roomId) => {
      console.log('joinRoom', roomId);
      client.join(roomId);
      client.to(roomId).emit('userConnected', roomId);
    });
    client.on('disconnect', () => {
      console.log('disconnect');
    });
  }
}

export default EventsGateway;
