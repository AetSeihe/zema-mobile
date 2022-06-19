import {FriendWithUserApiType} from '../types/friendType';
import {User} from './User';


export class Friend {
  id: number;
  userId: number;
  friendId: number;
  createdAt: string;
  updatedAt: string;
  user: User;

  constructor(data: FriendWithUserApiType) {
    this.id = data.id;
    this.userId = data.userId;
    this.friendId = data.friendId;
    this.user = new User(data.user);
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
