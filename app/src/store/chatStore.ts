import {makeAutoObservable, runInAction} from 'mobx';
import {Chat} from '../models/Chat';
import {User} from '../models/User';
import {chatService} from '../services/chatService';
import {GetAllMessagesInChat, GetChatsDTO, MessageType} from '../types/chatTypes';
import io from 'socket.io-client';

class ChatStore {
  chats: Chat[] = [];
  isNeverLoading = true;
  loading = false;
  loadingMessages = false;

  stopFetch = false;

  constructor() {
    makeAutoObservable(this);
  }

  init(user: User) {
    const socket = io('ws://localhost:305');

    socket.on(`msgToClient ${user.id}`, (data: MessageType) => {
      this.chats = this.chats.map((chat) => {
        if (chat.id === data.chat?.id) {
          chat.messages = [data, ...chat.messages];
        }
        return chat;
      });
    });
  }

  clearChats() {
    this.stopFetch = false,
    this.chats = [];
  }

  async fetchChats(data: GetChatsDTO) {
    if (this.stopFetch) {
      return;
    }
    runInAction(() => {
      this.loading = true;
    });

    const chats = await chatService.getAll(data);

    runInAction(() => {
      this.chats = [...this.chats, ...chats];
      this.loading = false;
      this.isNeverLoading = false;
      if (chats.length == 0) {
        this.stopFetch = true;
      }
    });
  }

  async fetchMessages(data: GetAllMessagesInChat) {
    runInAction(() => {
      this.loadingMessages = true;
    });
    const res = await chatService.getMessages(data);

    runInAction(() => {
      this.chats = this.chats.map((chat) => {
        if (chat.id === data.chatId) {
          chat.messages = [...chat.messages, ...res];
        }
        return chat;
      });
      this.loadingMessages = false;
    });
  }

  async sendMessage(user: User, message: string, chatId: number) {
    const msg = await chatService.sendMessage(user, message);
    runInAction(() => {
      this.chats = this.chats.map((chat) => {
        if (chat.id === chatId) {
          chat.messages = [msg, ...chat.messages];
        }
        return chat;
      });

      this.loadingMessages = false;
    });
  }
}


export const chatStore = new ChatStore();


