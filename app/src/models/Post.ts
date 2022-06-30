import {LikeType, PostType} from '../types/postTypes';
import {Comment} from './Comment';
import {FileModule} from './FileModule';
import {User} from './User';


export class Post {
  id: number;
  title: string;
  text: string;
  user: User;
  likes: LikeType[];
  comments: Comment[] = [];
  files: FileModule[];
  userId: number;
  updatedAt: Date;
  createdAt: Date;


  constructor(data: PostType) {
    this.id = data.id;
    this.title = data.title;
    this.text = data.text;
    this.user = new User(data.user);
    this.likes = data.likes;
    this.userId = data.userId;
    this.files = data.postFiles.map((file) => new FileModule({
      id: file.id,
      fileName: file.fileName,
    }));
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = data.updatedAt;
    try {
      if (data.comments) {
        this.comments = data.comments.map((comment) => new Comment(comment));
      }
    } catch (e) {
    }
  }


  get images(): FileModule[] {
    return this.files.filter((file) => file.type === 'image');
  }

  get dateCreated(): string {
    return `${this.createdAt.getDate()}.${this.createdAt.getMonth()}.${this.createdAt.getFullYear()}`;
  }

  userLiked(userId:number): boolean {
    return this.likes.some((like) => like.userId == userId);
  }
}
