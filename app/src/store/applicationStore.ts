import {autorun, makeAutoObservable, runInAction} from 'mobx';
import {Platform} from 'react-native';
import * as permissions from 'react-native-permissions';
import {request, check, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {getUserLocationRules, setUserLocationRules} from '../utils/userLocationRools';
import {userStore} from './userStore';
class ApplicationStore {
  appIsLoading: boolean = false;
  geoLocationStatus: permissions.PermissionStatus = 'unavailable';
  isGeolocationLoading: boolean = true;
  canUpdateLocation: boolean = false;
  canShowLocation: boolean = false;
  cordX: number | null = null;
  cordY: number | null = null;


  constructor() {
    makeAutoObservable(this);
    autorun(async () => {
      const cheakLocationPermission = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      this.geoLocationStatus = cheakLocationPermission;
      const rules = await getUserLocationRules();
      this.canUpdateLocation = rules.canUpdateLocation;
      this.canShowLocation = rules.canShowLocation;
    });
  }

  async fetchLocation() {
    if (this.geoLocationStatus === 'granted') {
      Geolocation.getCurrentPosition(
          (position) => {
            userStore.update({
              cordY: position.coords.longitude,
              cordX: position.coords.latitude,
            });
            this.cordY = position.coords.longitude;
            this.cordX = position.coords.latitude;
          },
          (error) => {
            console.log(error.code, error.message);
          },
      );
    }
  }

  async askPermissionForGeolocation() {
    runInAction(() => {
      this.isGeolocationLoading = true;
    });
    const res = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    runInAction(() => {
      setUserLocationRules({
        canUpdateLocation: res == 'granted',
        canShowLocation: res == 'granted',
      });
      this.canUpdateLocation = res == 'granted',
      this.canShowLocation = res == 'granted' || res === 'limited',
      this.geoLocationStatus = res;
      this.isGeolocationLoading = false;
    });
  }
}


export const applicationStore = new ApplicationStore();
