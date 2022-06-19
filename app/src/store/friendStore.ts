import {makeAutoObservable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import {Friend} from '../models/Friend';
import {friendService} from '../services/friendService';


class FriendStore {
  friends: Friend[] = [];
  friendLoading: boolean = false;
  requestLoading: boolean = false;
  requests: Friend[] = [];

  constructor() {
    makeAutoObservable(this);
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
