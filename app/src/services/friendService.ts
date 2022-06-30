import {friendApi} from '../api/friendApi';
import {Friend} from '../models/Friend';
import {RequestType} from '../types/friendType';


const getAllRequests = async (userId: number): Promise<Friend[]> => {
  const data = await friendApi.getAllRequests(userId);

  return data.data.friends.map((req) => new Friend(req));
};

const getAllFriends = async (userId: number): Promise<Friend[]> => {
  const data = await friendApi.getAllFriends(userId);
  return data.data.friends.map((req) => new Friend(req));
};

const sendRequest = async (userId: number): Promise<RequestType> => {
  const data = await friendApi.sendRequests(userId);

  return data.data;
};

const rejectRequests = async (userId: number): Promise<RequestType> => {
  const data = await friendApi.rejectRequests(userId);

  return data.data;
};

const acceptRequests = async (userId: number): Promise<RequestType> => {
  const data = await friendApi.acceptRequests(userId);

  return data.data;
};

const deleteFriend = async (userId: number): Promise<RequestType> => {
  const data = await friendApi.deleteFriend(userId);

  return data.data;
};

export const friendService = {getAllRequests, getAllFriends, sendRequest, rejectRequests, acceptRequests, deleteFriend};
