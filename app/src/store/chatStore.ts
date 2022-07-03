import {computed, makeAutoObservable, runInAction} from 'mobx';
import {Chat} from '../models/Chat';
import {User} from '../models/User';
import {chatService} from '../services/chatService';
import {GetAllMessagesInChat, GetChatsDTO, MessageSocketType} from '../types/chatTypes';
import io from 'socket.io-client';


class ChatStore {
  chats: Chat[] = [];
  activeChat?: Chat;
  isNeverLoading = true;
  loading = false;
  loadingMessages = false;

  stopFetch = false;


  constructor() {
    makeAutoObservable(this);
  }

  @computed get notReadedMessages() {
    return this.chats.filter((chat) => chat.messages.some((msg) => !msg.readed && msg.userId == chat.companion.id));
  }

  init(user: User) {
    const socket = io('ws://localhost:305');

    socket.on(`msgToClient ${user.id}`, ({chat, ...data}: MessageSocketType) => {
      if (!chat) {
        return;
      }

      let isEmptyChat = true;
      runInAction(() => {
        this.chats = this.chats.map((currentChat) => {
          if (currentChat.id == chat.id) {
            isEmptyChat = false;
            currentChat.messages = [data, ...currentChat.messages];
          }

          return currentChat;
        });
      });
      if (isEmptyChat) {
        const newChat = new Chat({
          ...chat,
          messages: [data],
          companion: data.companion,
        });
        runInAction(() => {
          this.chats = [...this.chats, newChat];
        });
      }
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
    const res = await chatService.getMessages({
      ...data,
    });

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

  async sendMessage(user: User, message: string) {
    runInAction(() => {
      this.loadingMessages = true;
    });
    await chatService.sendMessage(user, message);
    runInAction(() => {
      this.loadingMessages = false;
    });
  }

  async readMessages(chatId: number, messagesId: number[]) {
    if (messagesId.length == 0) {
      return;
    }
    const res = await chatService.readMessages(messagesId);

    if (!res) {
      return;
    }

    this.chats = this.chats.map((chat) => {
      if (chat.id === chatId) {
        chat.messages = chat.messages.map((msg) => {
          if (messagesId.includes(msg.id)) {
            msg.readed = true;
          }
          return msg;
        });
      }
      return chat;
    });
  }
}


export const chatStore = new ChatStore();


