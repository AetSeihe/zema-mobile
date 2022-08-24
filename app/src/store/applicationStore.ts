import {autorun, makeAutoObservable, runInAction} from 'mobx';
import {Platform} from 'react-native';
import * as permissions from 'react-native-permissions';
import {request, check, PERMISSIONS} from 'react-native-permissions';

class ApplicationStore {
  appIsLoading: boolean = false;
  geoLocationStatus: permissions.PermissionStatus = 'unavailable';
  isGeolocationLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    autorun(async () => {
      const cheakLocationPermission = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      this.geoLocationStatus = cheakLocationPermission;
    });
  }

  async askPermissionForGeolocation() {
    runInAction(() => {
      this.isGeolocationLoading = true;
    });
    const res = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    runInAction(() => {
      this.geoLocationStatus = res;
      this.isGeolocationLoading = false;
    });
  }
}


export const applicationStore = new ApplicationStore();
