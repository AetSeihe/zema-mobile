import {ChatType, MessageType} from '../types/chatTypes';
import {getNameDayByNumber, getNameMonthByNumber} from '../utils/getNameMonthByNumber';
import {User} from './User';


export class Chat {
  id: number;
  userOneId: number;
  userTwoId: number;
  createdAt: Date;
  updatedAt: Date;
  messages: MessageType[];
  companion: User;

  constructor(data: ChatType) {
    this.id = data.id;
    this.messages = data.messages;
    this.userOneId = data.userOneId;
    this.userTwoId = data.userTwoId;
    this.companion = new User(data.companion);
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }


  static getMessageSendTime(message: MessageType) {
    const date = new Date(message.createdAt);
    const currentDate = new Date();
    if (date.getMonth() === currentDate.getMonth()) {
      if (date.getDate() !== currentDate.getDate()) {
        return `${getNameDayByNumber(date.getDay())}`;
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }

    return `${getNameMonthByNumber(date.getMonth())}`;
  }
}
