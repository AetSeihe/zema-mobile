import {makeAutoObservable} from 'mobx';
import {userService} from '../services/userService';
import {SignInDataType, SignUpDataType, UserType} from '../types/userTypes';


class UserStore {
  user: UserType | null = null;
  loading: boolean = false;

  authErrors: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  async signIn(data: SignInDataType) {
    try {
      this.loading = true;
      const user = await userService.signIn(data);
      this.user = user;
      this.loading = false;
    } catch (e: any) {
      this.authErrors = ['Пользователь не найден'];
      this.loading = false;
      return e.message;
    }
  }

  async signUp(data: SignUpDataType) {
    try {
      this.loading = true;
      const user = await userService.signUp(data);
      this.user = user;
      this.loading = false;
    } catch (e: any) {
      this.authErrors = ['Неверный логин'];
      this.loading = false;
      return e.message;
    }
  }

  async signInById(id:number) {
    this.loading = true;
    this.user = await userService.getUserById(id);
    this.loading = false;
  }
}


export const userStore = new UserStore();
