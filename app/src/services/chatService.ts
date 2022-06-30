import {chatApi} from '../api/chatApi';
import {Chat} from '../models/Chat';
import {User} from '../models/User';
import {GetAllMessagesInChat, GetChatsDTO, MessageType} from '../types/chatTypes';


const getAll = async (data: GetChatsDTO): Promise<Chat[]> => {
  const res = await chatApi.getAll(data);

  return res.data.chats.map((chat) => new Chat(chat));
};


const getMessages = async (data: GetAllMessagesInChat): Promise<MessageType[]> => {
  const res = await chatApi.getAllMessages(data);

  return res.data.messages;
};

const sendMessage = async (user:User, message: string): Promise<MessageType> => {
  const formData = new FormData();
  formData.append('userTo', user.id);
  formData.append('message', message);

  const res = await chatApi.sendMessage(formData);

  return res.data;
};

export const chatService = {getAll, getMessages, sendMessage};
