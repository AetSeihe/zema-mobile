import {AxiosResponse} from 'axios';
import {GetAllChatsResponse, GetChatsDTO} from '../types/chatTypes';
import {axiosInstants, getApiConfig} from './axiosInit';


const getAll = (data: GetChatsDTO): Promise<AxiosResponse<GetAllChatsResponse>> => {
  return axiosInstants.post('chat/all', data, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

export const chatApi = {getAll};
