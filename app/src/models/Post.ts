import {LikeType, PostFileType, PostType} from '../types/postTypes';
import {User} from './User';


export class Post {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  user: User;
  likes: LikeType[];
  postFiles: PostFileType[];
  userId: number;
  updatedAt: Date;

  constructor(data: PostType) {
    this.id = data.id;
    this.title = data.title;
    this.text = data.text;
    this.user = data.user;
    this.likes = data.likes;
    this.userId = data.userId;
    this.postFiles = data.postFiles;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
