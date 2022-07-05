import {makeAutoObservable, reaction, runInAction} from 'mobx';
import {User} from '../models/User';
import {userService} from '../services/userService';
import {SignInDataType, SignUpDataType, UpdateProfileType} from '../types/userTypes';
import {chatStore} from './chatStore';
import {friendStore} from './friendStore';


class UserStore {
  user: User | null = null;
  loading: boolean = false;

  authErrors: string[] = [];


  constructor() {
    makeAutoObservable(this);

    reaction(() => !!this.user?.id, () => {
      const user = this.user;
      if (user) {
        chatStore.init(user);
        friendStore.fetchFriendsByUserId(user.id);
        friendStore.fetchRequestsByUserId(user.id);
      }
    });
  }


  async signIn(data: SignInDataType) {
    try {
      runInAction(() => {
        this.loading = true;
      });
      const user = await userService.signIn(data);
      runInAction(() => {
        this.user = new User(user);
        this.loading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.authErrors = ['Пользователь не найден'];
        this.loading = false;
      });
      return e.message;
    }
  }

  async signUp(data: SignUpDataType) {
    try {
      runInAction(() => {
        this.loading = true;
      });
      const user = await userService.signUp(data);
      runInAction(() => {
        this.user = new User(user);
        this.loading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.authErrors = ['Неверный логин'];
        this.loading = false;
      });
      return e.message;
    }
  }

  async signInById(id:number) {
    try {
      runInAction(() => {
        this.loading = true;
      });
      const user = await userService.getUserById(id);
      runInAction(() => {
        this.user = user;
        this.loading = false;
      });
    } catch (e) {}
  }

  async update(data: UpdateProfileType) {
    try {
      const currentUser = await userService.update(data);
      runInAction(() => {
        this.user = currentUser;
      });
      return currentUser;
    } catch (e: any) {
      return e.message || 'Упс... что-то пошло не так';
    }
  }
}


export const userStore = new UserStore();
