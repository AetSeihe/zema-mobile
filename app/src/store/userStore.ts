import {makeAutoObservable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import {User} from '../models/User';
import {userService} from '../services/userService';
import {SignInDataType, SignUpDataType, UpdateProfileType} from '../types/userTypes';


class UserStore {
  user: User | null = null;
  loading: boolean = false;

  authErrors: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  async signIn(data: SignInDataType) {
    try {
      this.loading = true;
      const user = await userService.signIn(data);
      this.user = new User(user);
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
      this.user = new User(user);
      this.loading = false;
    } catch (e: any) {
      this.authErrors = ['Неверный логин'];
      this.loading = false;
      return e.message;
    }
  }

  async signInById(id:number) {
    try {
      this.loading = true;
      this.user = await userService.getUserById(id);
      this.loading = false;
    } catch (e) {}
  }

  async update(data: UpdateProfileType) {
    try {
      const currentUser = await userService.update(data);
      runInAction(() => {
        this.user = currentUser;
      });
      return currentUser;
    } catch (e) {
      Alert.alert('Упс... что-то пошло не так');
      throw new Error();
    }
  }
}


export const userStore = new UserStore();
