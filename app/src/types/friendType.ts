import {UserType} from './userTypes';


export type RequestType = {
    id: number,
    userId: number,
    friendId: number,
    createdAt: string,
    updatedAt: string,
}


export type FriendWithUserApiType = {
    id: number,
    userId: number,
    friendId: number,
    createdAt: string,
    updatedAt: string,
    user: UserType,
}

export type GetAllFriendsApiType = {
  message: string,
  friends: FriendWithUserApiType[]
};


export type GetAllRequestApiType = {
  message: string,
  requests: FriendWithUserApiType[]
};
