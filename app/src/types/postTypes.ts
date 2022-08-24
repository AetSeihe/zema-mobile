import {Asset} from 'react-native-image-picker';
import {UserType} from './userTypes';


export type LikeType = {
  postId: number;
  userId: number;
}

export type CommentType = {
  id: number,
  userId: number,
  postId: number,
  text: string,
  updatedAt: string,
  createdAt: string,
  user: UserType
}

export type CommentApiType = {
  message: string;
  comment: CommentType
}


export type CreatePostType = {
  title: string;
  text: string;
  images: Asset[];
}

export type PostFileType = {
    id: number;
    postId: number;
    fileName: string;
}

export type PostType = {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  user: UserType;
  likes: LikeType[];
  comments: CommentType[];
  postFiles: PostFileType[];
  userId: number;
  updatedAt: Date;
  likeCount: number;
  isLike: boolean;
}


type AllPostsDataDTO = {
  text?: string;
  cityFromId?: number;
  cityToId?: number;
  userId?: number
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

export type GetOnePostType = {
  message: string;
  post: PostType
}
