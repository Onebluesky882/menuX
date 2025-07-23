import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OrderGateway {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    const { shopId } = client.handshake.query;
    if (shopId) client.join(shopId.toString());
    console.log(`Client joined room: ${shopId}`);
  }

  notifyNewOrder(order: any, shopId: string) {
    this.server.to(shopId).emit('newOrder', order);
  }

  notifyOrderUpdate(order: any, shopId: string) {
    this.server.to(shopId).emit('orderUpdated', order);
  }

  @SubscribeMessage('orderStatusUpdate')
  handleStatusUpdate(@MessageBody() data: { shopId: string; status: string }) {
    this.server.to(data.shopId).emit('orderUpdated', data);
  }
}
