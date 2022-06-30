import {AxiosResponse} from 'axios';
import {GetAllChatsResponse, GetAllMessagesInChat, GetAllMessagesResponse, GetChatsDTO, MessageType} from '../types/chatTypes';
import {axiosInstants, getApiConfig} from './axiosInit';


const getAll = (data: GetChatsDTO): Promise<AxiosResponse<GetAllChatsResponse>> => {
  return axiosInstants.post('chat/all', data, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};


const getAllMessages = (data: GetAllMessagesInChat): Promise<AxiosResponse<GetAllMessagesResponse>> => {
  return axiosInstants.get('chat/messages', {
    headers: {
      ...getApiConfig().headers,
    },
    params: data,
  });
};
// В процессе
const sendMessage = (data: FormData): Promise<AxiosResponse<MessageType>> => {
  return axiosInstants.post('chat/send', data, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};


export const chatApi = {getAll, sendMessage, getAllMessages};
