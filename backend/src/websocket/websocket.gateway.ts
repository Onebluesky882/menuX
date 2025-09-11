import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    // todo will change later
    origen: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;
  // ฟัง event 'message'
  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log('📩 message from client:', data);
    client.emit('messageResponse', `Echo: ${data.text}`);
  }

  // ฟัง event 'notify'
  @SubscribeMessage('notify')
  handleNotify(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log('🔔 notify from client:', data);
    client.emit('notifyResponse', `Notify received: ${data.info}`);
  }

  // ฟัง event 'joinRoom'
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.join(room);
    client.emit('joined', `Joined room: ${room}`);
    this.server.to(room).emit('roomMessage', `User ${client.id} joined!`);
  }
}
