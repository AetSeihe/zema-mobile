import {friendApi} from '../api/friendApi';
import {Friend} from '../models/Friend';
import {User} from '../models/User';
import {FetchUserNearType, RequestType} from '../types/friendType';


const getAllRequests = async (userId: number): Promise<Friend[]> => {
  try {
    const data = await friendApi.getAllRequests(userId);

    return data.data.requests.map((req) => new Friend(req));
  } catch (e: any) {
    console.log(JSON.stringify(e.message, null, 2));
    return [];
  }
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

const fetchUsersNear = async (options: FetchUserNearType) => {
  const {data} = await friendApi.fetchUsersNear(options);
  const users = data.users.map((user) => new User(user));

  return {
    users,
    allCount: data.allCount,
  };
};

const fetchBlockedUsers = async (): Promise<User[]> => {
  const res = await friendApi.fetchBlockedUsers();

  return res.data.map((user) => new User(user));
};

const blockUser = async (userId: number): Promise<boolean> => {
  const res = await friendApi.blockUser(userId);

  return res.data;
};

const unBlockUser = async (userId: number): Promise<boolean> => {
  const res = await friendApi.unblockUser(userId);

  return res.data;
};

export const friendService = {getAllRequests, getAllFriends, sendRequest, rejectRequests, acceptRequests, deleteFriend, fetchUsersNear, fetchBlockedUsers, blockUser, unBlockUser};
