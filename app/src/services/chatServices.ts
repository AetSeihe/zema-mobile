import {Asset} from 'react-native-image-picker';
import {chatApi} from '../api/chatApi';
import {Chat} from '../models/Chat';
import {Message} from '../models/Message';
import {GetAllChatOptionsType, GetChatByUserType, GetChatsByMsgText, GetMessagesInChatType, GetUsersInChatsByName, SendMessageType} from '../types/chatTypes';


const getAll = async (data: GetAllChatOptionsType): Promise<Chat[]> => {
  const res = await chatApi.getAll(data);

  const filterRes = res.data.chats.filter((chat) => chat.companion);
  return filterRes.map((chat) => new Chat(chat));
};


const getUsersByName = async (data: GetUsersInChatsByName): Promise<Chat[]> => {
  const res = await chatApi.getUsersByName(data);
  return res.data.chats.map((chat) => new Chat(chat));
};

const getChatsByMessageText = async (data: GetChatsByMsgText): Promise<Chat[]> => {
  const res = await chatApi.getChatsByMessageText(data);

  return res.data.chats.map((chat) => new Chat(chat));
};
const getChatByUsers = async (data: GetChatByUserType): Promise<Chat> => {
  const res = await chatApi.getChatByUsers(data);

  return new Chat(res.data);
};


const getMessages = async (data: GetMessagesInChatType): Promise<Message[]> => {
  const res = await chatApi.getMessages(data);

  return res.data.messages.map((msg) => new Message(msg));
};
const sendMessage = async (data: SendMessageType, files: Asset[]): Promise<Message> => {
  const res = await chatApi.sendMessage(data, files);

  return new Message(res.data);
};

export const chatServices = {getAll, getUsersByName, getChatsByMessageText, getChatByUsers, sendMessage, getMessages};

