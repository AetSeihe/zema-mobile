import {User} from '../models/User';


export type LikeType = {
  postId: number;
  userId: number;
}

export type PostFileType = {
    postId: number;
    fileName: string;
}

export type PostType = {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  user: User;
  likes: LikeType[];
  postFiles: PostFileType[];
  userId: number;
  updatedAt: Date;
}


type AllPostsDataDTO = {
  text?: string;
  cityFromId?: string;
  cityToId?: string;
}

type AllPostsParams = {
  limit?: number;
  offset?: number;
  sortBy?: string;
}


export type GetAllPostsOptions = {
  data: AllPostsDataDTO,
  options: AllPostsParams
}

export type GetAllPostsApiType = {
  message: string;
  posts: PostType[]
}
