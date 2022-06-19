import {makeAutoObservable, runInAction} from 'mobx';
import {Post} from '../models/Post';
import {postService} from '../services/postServices';
import {CreatePostType, GetAllPostsOptions} from '../types/postTypes';


class PostStore {
  posts: Post[] = [];
  loading = false;
  neverLoad = true;
  
  constructor() {
    makeAutoObservable(this);
  }

  async fetchPosts(options: GetAllPostsOptions) {
    try {
      runInAction(() => {
        this.loading = true;
      });
      const posts = await postService.getAllPosts(options);
      runInAction(() => {
        this.posts = posts;
      });

      runInAction(() => {
        this.loading = false;
      });
    } catch (e) {
    }
  }

  async listPosts(options: GetAllPostsOptions) {
    try {
      runInAction(() => {
        this.loading = true;
      });
      const posts = await postService.getAllPosts(options);
      runInAction(() => {
        this.posts = [...this.posts, ...posts];
      });

      runInAction(() => {
        this.loading = false;
      });
    } catch (e) {
    }
  }

  async fetchPostsIsNeverLoad(options: GetAllPostsOptions) {
    if (this.neverLoad) {
      this.fetchPosts(options);
      this.neverLoad = false;
    }
  }

  async createPost(data: CreatePostType): Promise<string | void> {
    try {
      postService.createPost(data);
    } catch (e: any) {
      return e.message || 'Упс... что-то пошло не так';
    }
  }

  async likePost(post: Post, userId:number): Promise<Post | void> {
    let currentPost;
    runInAction(() => {
      this.posts = this.posts.map((p) => {
        if (p.id !== post.id) {
          return p;
        }
        currentPost = p;

        if (p.userLiked(userId)) {
          p.likes = p.likes.filter((like) => like.userId !== userId);
          return p;
        }
        p.likes.push({
          postId: p.id,
          userId,
        });

        return p;
      });
    });


    postService.likePost(post);
    return currentPost;
  }

  async commentPost(comment: string, postId: number) {
    const newComment = await postService.commentPost(comment, postId);
    return newComment;
  }
}


export const postStore = new PostStore();
