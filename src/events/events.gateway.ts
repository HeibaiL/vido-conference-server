import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  allClients = [];

  @SubscribeMessage('connection')
  handleConnection(client: Socket): void {
    client.on('joinRoom', (roomId, userId) => {
      this.allClients.push({ ...client, userId });

      client.join(roomId);
      client.to(roomId).emit('userConnected', userId);

      client.on('leaveRoom', (roomId, userId) => {
        client.to(roomId).emit('userDisconnected', userId);
      });

      client.on('disconnect', () => {
        this.allClients = this.allClients.filter(
          (client) => client.userId !== userId,
        );
        client.to(roomId).emit('userDisconnected', userId);
      });
    });
  }
}

export default EventsGateway;
