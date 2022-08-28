import {makeAutoObservable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import {Friend} from '../models/Friend';
import {User} from '../models/User';
import {friendService} from '../services/friendService';
import {FetchUserNearType} from '../types/friendType';


class FriendStore {
  friends: Friend[] = [];
  requests: Friend[] = [];
  usersNear: User[] = [];
  usersNearAllCount: number = 0;
  friendLoading: boolean = false;
  requestLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsersNear(data: FetchUserNearType) {
    try {
      const res = await friendService.fetchUsersNear(data);
      runInAction(() => {
        this.usersNear = res.users;
        this.usersNearAllCount = res.allCount || 0;
      });
    } catch (e) {
      Alert.alert('Ошибка при загрузке пользователей рядом');
    }
  }
  async fetchFriendsByUserId(userId:number) {
    try {
      runInAction(() => {
        this.friendLoading = true;
      });
      const friends = await friendService.getAllFriends(userId);
      runInAction(() => {
        this.friends = friends;
        this.friendLoading = false;
      });
      return true;
    } catch (e) {
      this.friendLoading = false;
      Alert.alert('Ошибка при загрузке списка друзей');
    }
  }

  async fetchRequestsByUserId(userId:number) {
    try {
      runInAction(() => {
        this.requestLoading = true;
      });
      const friends = await friendService.getAllRequests(userId);
      runInAction(() => {
        this.requests = friends;
        this.requestLoading = false;
      });
      return true;
    } catch (e) {
      this.requestLoading = false;
      Alert.alert('Ошибка при загрузке списка запросов в друзья');
    }
  }

  async acceptRequest(requestId:number) {
    try {
      await friendService.acceptRequests(requestId);
      runInAction(() => {
        this.requests = this.requests.filter((request) => request.id !== requestId);
      });
      return true;
    } catch (e) {
      Alert.alert('Ошибка при добавлении в друзья');
    }
  }

  async rejectRequest(requestId:number) {
    try {
      await friendService.rejectRequests(requestId);
      runInAction(() => {
        this.requests = this.requests.filter((request) => request.id !== requestId);
      });
      return true;
    } catch (e) {
      Alert.alert('Ошибка при отклонении заявки');
    }
  }

  async sendRequests(userId:number) {
    try {
      await friendService.sendRequest(userId);

      return true;
    } catch (e) {
      Alert.alert('Вы не можете отправить запрос в друзья данному человеку');
    }
  }

  async deleteFriend(userId:number) {
    try {
      await friendService.deleteFriend(userId);
      runInAction(() => {
        this.friends = this.friends.filter((friend) => friend.id !== userId);
      });
      return true;
    } catch (e) {
      Alert.alert('Друг успешно удален');
    }
  }
}

export const friendStore = new FriendStore();
