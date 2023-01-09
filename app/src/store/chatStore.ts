import {computed, makeAutoObservable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {io} from 'socket.io-client';
import {socketUrl} from '../constants/root';
import {Chat} from '../models/Chat';
import {Message} from '../models/Message';
import {User} from '../models/User';
import {chatServices} from '../services/chatServices';
import {ChatType, GetAllChatOptionsType, GetChatsByMsgText, GetUsersInChatsByName, MessageType} from '../types/chatTypes';

export const BASE_LIMIT_TO_FETCH_CHATS = 15;

export const LIMIT_TO_FETCH_MESSAGES = 20;
class ChatStore {
  // === MESSAGES
  offsetToFetchMessages = 0;
  // === MESSAGES
  chats: Map<number, Chat> = new Map();
  loadingChats: boolean = false;
  loadingChatsByUserName: boolean = false;
  chatsByUserName: Chat[] = [];
  chatsByMessage: Chat[] = [];
  loadingChatsByMessage: boolean = false;
  activeChat: Chat | null = null;
  messagesInActiveChat: Message[] = [];
  sengingMessagesInActiveChat: Message[] = [];
  isConnectSocketIO: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }


  init(userId: number) {
    if (this.isConnectSocketIO) {
      return;
    }
    this.isConnectSocketIO = true;
    const socket = io(socketUrl);

    socket.on(`sendMessage ${userId}`, ([data, chat]: [MessageType, ChatType]) => {
      const message = new Message(data);
      runInAction(() => {
        this.chats.set(chat.id, new Chat({...chat, messages: [data]}));
      });
      if (this.activeChat?.id === data.chatId) {
        runInAction(() => {
          this.messagesInActiveChat.unshift(message);
        });
      }
    });
  }


  get currentMessageList() {
    return [...this.sengingMessagesInActiveChat, ...this.messagesInActiveChat];
  }


  async getAll(data: GetAllChatOptionsType) {
    runInAction(() => {
      this.loadingChats = true;
    });
    const chats = await chatServices.getAll(data);

    runInAction(() => {
      chats.forEach((chat) => {
        this.chats.set(chat.id, chat);
      });
      this.loadingChats = false;
    });
  }

  // GET CHATS

  async getChatsByUserName(data: GetUsersInChatsByName) {
    runInAction(() => {
      this.loadingChatsByUserName = true;
    });
    const chats = await chatServices.getUsersByName(data);

    runInAction(() => {
      this.chatsByUserName = chats;
      this.loadingChatsByUserName = false;
    });
  }

  async getChatsByMessageText(data: GetChatsByMsgText) {
    runInAction(() => {
      this.loadingChatsByMessage = true;
    });
    const chats = await chatServices.getChatsByMessageText(data);

    runInAction(() => {
      this.chatsByMessage = chats;
      this.loadingChatsByMessage = false;
    });
  }

  async getActiveChatByUsers(userOneId:number, userTwoId: number) {
    const chat = await chatServices.getChatByUsers({
      userOneId: userOneId,
      userTwoId: userTwoId,
    });


    if (chat.id === this.activeChat?.id) {
      return;
    }
    this.setActiveChatAndDeleteMessages(chat);
  }
  // ===== GET CHATS

  setActiveChatAndDeleteMessages(chat: Chat) {
    runInAction(() => {
      this.activeChat = chat;
      this.messagesInActiveChat = [];
      this.sengingMessagesInActiveChat = [];
      this.offsetToFetchMessages = 0;
    });
  }

  async fetchMessagesFromActiveChat() {
    if (!this.activeChat) {
      return;
    }
    const res = await chatServices.getMessages({
      chatId: this.activeChat.id.toString(),
      limit: LIMIT_TO_FETCH_MESSAGES,
      offset: this.offsetToFetchMessages,
    });
    runInAction(() => {
      this.offsetToFetchMessages+= LIMIT_TO_FETCH_MESSAGES;
      this.messagesInActiveChat = [...this.messagesInActiveChat, ...res];
    });
  }


  @computed get chatsArray() {
    const sort = [...this.chats].map(([name, value]) => (value)).sort((prev, next) => {
      const res = prev.updatedAt.getTime() - next.updatedAt.getTime();
      return res > 0 ? -1 : 1;
    });
    return sort;
  }

  addMessageToSenging(chat: Chat,
      user: User,
      message: string,
      messageId: number,
      images: Asset[]) {
    const newMsg = new Message({
      id: messageId,
      message: message,
      readed: false,
      chatId: chat.id,
      userId: user.id,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      sending: true,
      isNewMessage: true,
      files: images,
    });

    runInAction(() => {
      this.sengingMessagesInActiveChat.unshift(newMsg);
    });
  }

  deleteMessageFromSending(messageId: number) {
    runInAction((()=> {
      this.sengingMessagesInActiveChat = this.sengingMessagesInActiveChat.filter((msg) => msg.id != messageId);
    }));
  }

  async sendMessage(chat: Chat, user: User, message: string, images: Asset[], replyMessageId?: number) {
    try {
      const msgId = Math.floor(Math.random() * 100) + 12132;
      this.addMessageToSenging(chat, user, message, msgId, images);

      const res = await chatServices.sendMessage({
        message: message,
        userTo: chat.companion.id,
        replyMessageId: replyMessageId,
      }, images);

      this.deleteMessageFromSending(msgId);
      runInAction(() => {
        this.messagesInActiveChat.unshift(res);
      });
    } catch (e) {
      Alert.alert('Упс... что-то пошло не так');
    }
  }
}


export const chatStore = new ChatStore();
