import {makeAutoObservable} from 'mobx';
import {Post} from '../models/Post';
import {postService} from '../services/postServices';
import {GetAllPostsOptions} from '../types/postTypes';


class PostStore {
  posts: Post[] = [];
  loading = false;
  neverLoad = true;
  constructor() {
    makeAutoObservable(this);
  }

  async fetchPosts(options: GetAllPostsOptions) {
    try {
      this.loading = true;
      this.posts = await postService.getAllPosts(options);
      this.loading = false;
    } catch (e) {
    }
  }

  async fetchPostsIsNeverLoad(options: GetAllPostsOptions) {
    if (this.neverLoad) {
      this.fetchPosts(options);
      this.neverLoad = false;
    }
  }
}


export const postStore = new PostStore();
