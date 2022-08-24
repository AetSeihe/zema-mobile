import {AxiosResponse} from 'axios';
import {GetAllFriendsApiType, GetAllRequestApiType, RequestType} from '../types/friendType';
import {axiosInstants, getApiConfig} from './axiosInit';

const getAllRequests = (userId: number): Promise<AxiosResponse<GetAllRequestApiType>> => {
  return axiosInstants.get(`friend/request/${userId}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const getAllFriends = (userId: number): Promise<AxiosResponse<GetAllFriendsApiType>> => {
  return axiosInstants.get(`friend/friends/${userId}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};


const sendRequests = (userId: number): Promise<AxiosResponse<RequestType>> => {
  return axiosInstants.post(`friend/send/${userId}`, {}, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const rejectRequests = (userId: number): Promise<AxiosResponse<RequestType>> => {
  return axiosInstants.post(`friend/reject/${userId}`, {}, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const acceptRequests = (userId: number): Promise<AxiosResponse<RequestType>> => {
  return axiosInstants.post(`friend/accept/${userId}`, {}, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const deleteFriend = (userId: number): Promise<AxiosResponse<RequestType>> => {
  return axiosInstants.delete(`friend/delete-friend/${userId}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

export const friendApi = {getAllRequests, sendRequests, rejectRequests, deleteFriend, acceptRequests, getAllFriends};
