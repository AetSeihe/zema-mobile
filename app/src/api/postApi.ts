import {AxiosResponse} from 'axios';
import {Asset} from 'react-native-image-picker';
import {CommentApiType, CreatePostType, GetAllPostsApiType, GetAllPostsOptions, GetOnePostType, LikeType} from '../types/postTypes';
import {axiosInstants, getApiConfig} from './axiosInit';

const getAllPostsByOptions = (data: GetAllPostsOptions): Promise<AxiosResponse<GetAllPostsApiType>> => {
  return axiosInstants.post('post/all', data, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const getPostById = (postId: number): Promise<AxiosResponse<GetOnePostType>> => {
  return axiosInstants.get(`post/${postId}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const createPost = (data: CreatePostType): Promise<AxiosResponse<GetOnePostType>> => {
  const formData = new FormData();
  formData.append('text', data.text);
  formData.append('title', data.title);

  data.images.forEach((photo: Asset) => {
    formData.append('files', {uri: photo.uri, name: photo.fileName, type: photo.type});
  });

  return axiosInstants({
    url: 'post/create',
    method: 'POST',
    data: formData,
    headers: {
      ...getApiConfig().headers,
      'Content-Type': 'multipart/form-data',
    },
  });
};

const likePostById = (postId:number): Promise<AxiosResponse<LikeType>> => {
  return axiosInstants.post('post/like', {
    postId,
  }, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const commentPostById = (text: string, postId:number): Promise<AxiosResponse<CommentApiType>> => {
  return axiosInstants.post('post/comment', {
    postId,
    text,
  }, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};


export const postApi = {getAllPostsByOptions, createPost, likePostById, commentPostById, getPostById};
