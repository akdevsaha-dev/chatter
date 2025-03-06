import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Message from '../models/message.model.js';

interface UserSocket {
  userId: string;
  socketId: string;
}

interface ChatMessage {
  text: string;
  senderId: string;
  receiverId: string;
  image?: string;
}

export class SocketService {
  private io: Server;
  private onlineUsers: UserSocket[] = [];

  constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      },
    });

    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          throw new Error('Authentication error');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userID: string };
        socket.data.userId = decoded.userID;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    this.setupSocketEvents();
  }

  private getUserSocketId(userId: string): string | undefined {
    return this.onlineUsers.find(user => user.userId === userId)?.socketId;
  }

  private setupSocketEvents() {
    this.io.on('connection', async (socket) => {
      const userId = socket.data.userId;
      
      // Add user to online users
      this.onlineUsers.push({
        userId,
        socketId: socket.id,
      });

      // Update user's online status in database
      await User.findByIdAndUpdate(userId, { isOnline: true });

      // Broadcast user's online status to all connected clients
      this.io.emit('userOnline', { userId });

      // Send initial online users list to the connected client
      const onlineUserIds = this.onlineUsers.map(user => user.userId);
      socket.emit('onlineUsers', onlineUserIds);

      // Handle new messages
      socket.on('sendMessage', async (message: ChatMessage) => {
        try {
          // Save message to database
          const newMessage = new Message({
            senderId: message.senderId,
            receiverId: message.receiverId,
            text: message.text,
            image: message.image,
          });
          await newMessage.save();

          // Send to receiver if online
          const receiverSocketId = this.getUserSocketId(message.receiverId);
          if (receiverSocketId) {
            this.io.to(receiverSocketId).emit('newMessage', newMessage);
          }

          // Send back to sender
          socket.emit('messageSent', newMessage);
        } catch (error) {
          console.error('Error sending message:', error);
          socket.emit('messageError', { error: 'Failed to send message' });
        }
      });

      // Handle typing status
      socket.on('typing', ({ receiverId }: { receiverId: string }) => {
        const receiverSocketId = this.getUserSocketId(receiverId);
        if (receiverSocketId) {
          this.io.to(receiverSocketId).emit('userTyping', { userId });
        }
      });

      socket.on('stopTyping', ({ receiverId }: { receiverId: string }) => {
        const receiverSocketId = this.getUserSocketId(receiverId);
        if (receiverSocketId) {
          this.io.to(receiverSocketId).emit('userStoppedTyping', { userId });
        }
      });

      socket.on('disconnect', async () => {
        // Remove user from online users
        this.onlineUsers = this.onlineUsers.filter(
          (user) => user.socketId !== socket.id
        );

        // Update user's online status in database
        await User.findByIdAndUpdate(userId, { isOnline: false });

        // Broadcast user's offline status
        this.io.emit('userOffline', { userId });
      });
    });
  }

  public getIO() {
    return this.io;
  }
} 