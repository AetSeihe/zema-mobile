import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { Alert, Linking, Platform } from 'react-native';
import * as permissions from 'react-native-permissions';
import { request, check, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { getUserLocationRules, setUserLocationRules } from '../utils/userLocationRools';
import { FileModule } from '../models/FileModule';
class ApplicationStore {
  appIsLoading: boolean = false;
  geoLocationStatus: permissions.PermissionStatus = 'unavailable';
  isGeolocationLoading: boolean = true;
  canUpdateLocation: boolean = false;
  canShowLocation: boolean = false;
  fullScreenImage: FileModule | null = null;
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

  setFullScreenImage(img: FileModule) {
    this.fullScreenImage = img;
  }

  clearFullScreenImage() {
    this.fullScreenImage = null;
  }

  async fetchLocation() {
    if (this.canFetchLocation()) {
      Geolocation.getCurrentPosition(
        (position) => {
          runInAction(() => {
            this.cordY = position.coords.longitude;
            this.cordX = position.coords.latitude;
          });
        },
        (error) => {
          console.log(error.code, error.message);
        },
      );
    }
  }

  async askPermissionForGeolocation() {
    if (this.geoLocationStatus === 'blocked') {
      Alert.alert('Доступ к геопозиции', 'Нужно разрешить доступ к геолокаци в приложении', [
        {
          text: 'Позже',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Перейти',
          onPress: () => Linking.openSettings(),
        },
      ]);
    }

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

    return res === 'granted' || res === 'limited';
  }


  canFetchLocation() {
    return this.geoLocationStatus === 'granted' || this.geoLocationStatus == 'limited';
  }
}


export const applicationStore = new ApplicationStore();
