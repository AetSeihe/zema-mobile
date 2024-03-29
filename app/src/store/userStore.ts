import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { FileModule } from '../models/FileModule';
import { User } from '../models/User';
import { userService } from '../services/userService';
import { SignInDataType, SignUpDataType, UpdateProfileType } from '../types/userTypes';
import { friendStore } from './friendStore';
import { applicationStore } from './applicationStore';
import Geolocation from 'react-native-geolocation-service';
import { Alert } from 'react-native';


class UserStore {
  user: User | null = null;
  loading: boolean = false;

  authErrors: string[] = [];


  constructor() {
    makeAutoObservable(this);
    reaction(() => !!this.user?.id && applicationStore.canUpdateLocation, () => {
      if (applicationStore.canUpdateLocation) {
        Geolocation.getCurrentPosition(
          (position) => {
            const cordX = +position.coords.latitude;
            const cordY = +position.coords.longitude;
            if (cordY && cordX) {
              this.update({
                cordX: cordX,
                cordY: cordY,
              });
            }
          },
          (error) => {
            Alert.alert('Призошла ошибка при отправке геолокации');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
    reaction(() => !!this.user?.id, () => {
      const user = this.user;
      if (user) {
        friendStore.fetchFriendsByUserId(user.id);
        friendStore.fetchRequestsByUserId(user.id);
        friendStore.fetchBlockedUsers();
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
        this.authErrors = ['Логин или пароль введен не верно'];
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

  async signInById(id: number) {
    try {
      runInAction(() => {
        this.loading = true;
      });
      const user = await userService.getUserById(id);
      runInAction(() => {
        this.user = user;
        this.loading = false;
      });
    } catch (e) { }
  }

  async update(data: UpdateProfileType): Promise<User> {
    const currentUser = await userService.update(data);
    runInAction(() => {
      this.user = currentUser;
    });
    return currentUser;
  }

  async deletePhoto(photo: FileModule) {
    await userService.deletePhotoByName(photo.name);
    runInAction(() => {
      if (this.user?.images) {
        this.user.images = this.user?.images.filter((image) => image.id != photo.id);
      }
    });
  }
}


export const userStore = new UserStore();
