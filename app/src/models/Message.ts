import {MessageType, ReplyMessageType} from '../types/chatTypes';
import {FileModule} from './FileModule';

export class Message {
  id: number;
  message: string;
  readed: boolean;
  chatId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  sending?: boolean;
  isNewMessage?: boolean;
  replies: ReplyMessageType[];
  files: FileModule[];


  constructor(data: MessageType) {
    this.id = +data.id;
    this.message = data.message;
    this.readed = data.readed;
    this.chatId = data.chatId;
    this.userId = data.userId;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.sending = data.sending;
    this.isNewMessage = data.isNewMessage;
    this.replies = data.replies || [];
    this.files = data.files?.map((file) => new FileModule(file)) || [];
  }


  get images() {
    return this.files.filter((file) => file.type === 'image');
  }
}
