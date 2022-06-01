import {postApi} from '../api/postApi';
import {Post} from '../models/Post';
import {GetAllPostsOptions} from '../types/postTypes';


const getAllPosts = async (options: GetAllPostsOptions): Promise<Post[]> => {
  try {
    const data = await postApi.getAllPostsByOptions(options);
    return [];
  } catch (e: any) {
    console.log(e.response.data);
    throw new Error('хер');
  }
};

export const postService = {getAllPosts};

