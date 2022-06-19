import {CommentType} from '../types/postTypes';
import {User} from './User';


export class Comment {
  id: number;
  userId: number;
  postId: number;
  text: string;
  updatedAt: string;
  createdAt: string;
  user: User;


  constructor(data: CommentType) {
    this.id = data.id;
    this.userId = data.userId;
    this.postId = data.postId;
    this.text = data.text;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
    this.user = new User(data.user);
  }
}
