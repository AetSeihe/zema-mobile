import {AxiosResponse} from 'axios';
import {FetchUserNearType, GetAllFriendsApiType, GetAllRequestApiType, RequestType} from '../types/friendType';
import {GetUsersArray, UserType} from '../types/userTypes';
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

const fetchUsersNear = (data: FetchUserNearType): Promise<AxiosResponse<GetUsersArray>> => {
  return axiosInstants.post(`user/all-by-cords`, data, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const fetchBlockedUsers = (): Promise<AxiosResponse<UserType[]>> => {
  return axiosInstants.get(`user/all-bans`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const blockUser = (userId: number): Promise<AxiosResponse<boolean>> => {
  return axiosInstants.post(`user/ban/${userId}`, {}, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const unblockUser = (userId: number): Promise<AxiosResponse<boolean>> => {
  return axiosInstants.delete(`user/ban/${userId}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

export const friendApi = {getAllRequests, sendRequests, rejectRequests, deleteFriend, acceptRequests, getAllFriends, fetchUsersNear, fetchBlockedUsers, blockUser, unblockUser};
