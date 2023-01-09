import {AxiosResponse} from 'axios';
import {Asset} from 'react-native-image-picker';
import {Message} from '../models/Message';
import {ChatType, GetAllChatOptionsType, GetAllChatsResponseType, GetChatByUserType, GetChatsByMsgText, GetMessagesInChatType, GetUsersInChatsByName, MessageType, ResponseGetMessagesInChatType, SendMessageType} from '../types/chatTypes';
import {axiosInstants, getApiConfig} from './axiosInit';


const getAll = (data: GetAllChatOptionsType): Promise<AxiosResponse<GetAllChatsResponseType>> => {
  return axiosInstants.get(`chat/all`, {
    headers: {
      ...getApiConfig().headers,
    },
    params: data,
  });
};

const getChatByUsers = (data: GetChatByUserType): Promise<AxiosResponse<ChatType>> => {
  return axiosInstants.get(`chat/get-chat`, {
    headers: {
      ...getApiConfig().headers,
    },
    params: data,
  });
};

const readMessages = (messages: Message[]): Promise<AxiosResponse<MessageType>> => {
  const messagesIdList = messages.map((message) => message.id);

  return axiosInstants.put('chat/read', messagesIdList, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};


const getUsersByName = (data: GetUsersInChatsByName): Promise<AxiosResponse<GetAllChatsResponseType>> => {
  return axiosInstants.get(`chat/users-chats`, {
    headers: {
      ...getApiConfig().headers,
    },
    params: data,
  });
};

const sendMessage = (data: SendMessageType, files: Asset[]): Promise<AxiosResponse<MessageType>> => {
  const formData = new FormData();


  Object.keys(data).forEach((key: any) => {
    formData.append(key, data[key]);
  });

  files.forEach((file: Asset) => {
    formData.append('files', {uri: file.uri, name: file.fileName, type: file.type});
  });

  return axiosInstants.post(`chat/send`, formData, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const getChatsByMessageText = (data: GetChatsByMsgText): Promise<AxiosResponse<GetAllChatsResponseType>> => {
  return axiosInstants.get(`chat/chats-by-msg`, {
    headers: {
      ...getApiConfig().headers,
    },
    params: data,
  });
};

const getMessages = (data: GetMessagesInChatType): Promise<AxiosResponse<ResponseGetMessagesInChatType>> => {
  return axiosInstants.get(`chat/messages`, {
    headers: {
      ...getApiConfig().headers,
    },
    params: data,
  });
};

export const chatApi = {getAll, getUsersByName, getChatsByMessageText, getChatByUsers, sendMessage, getMessages, readMessages};
