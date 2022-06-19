import {postApi} from '../api/postApi';
import {Comment} from '../models/Comment';
import {Post} from '../models/Post';
import {CreatePostType, GetAllPostsOptions, LikeType} from '../types/postTypes';


const getAllPosts = async (options: GetAllPostsOptions): Promise<Post[]> => {
  try {
    const data = await postApi.getAllPostsByOptions(options);
    return data.data.posts.map((data) =>new Post(data));
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const createPost = async (data: CreatePostType): Promise<void> => {
  try {
    await postApi.createPost(data);
  } catch (e: any) {
    throw new Error('Упс... что-то пошло не так');
  }
};

const likePost = async (post: Post): Promise<LikeType> => {
  try {
    const res = await postApi.likePostById(post.id);
    return res.data;
  } catch (e: any) {
    throw new Error('Упс... что-то пошло не так');
  }
};


const commentPost = async (comment: string, postId: number): Promise<Comment> => {
  try {
    const res = await postApi.commentPostById(comment, postId);
    return new Comment(res.data.comment);
  } catch (e: any) {
    throw new Error('Упс... что-то пошло не так');
  }
};


const getPostById = async (postId: number) => {
  try {
    const res = await postApi.getPostById(postId);
    return new Post(res.data.post);
  } catch (e: any) {
    throw new Error('Упс... что-то пошло не так');
  }
};

export const postService = {getAllPosts, createPost, likePost, commentPost, getPostById};

