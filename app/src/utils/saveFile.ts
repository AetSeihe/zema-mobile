import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {PermissionsAndroid, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {FileModule} from '../models/FileModule';

const saveFileToIOS = async (file: FileModule) => {
  await CameraRoll.save(file.url);

  return true;
};


const saveFileToAndroid = async (file: FileModule)=> {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  await PermissionsAndroid.request(permission);

  const res = await RNFetchBlob
      .config({
        fileCache: true,
        appendExt: 'jpg',
      })
      .fetch('GET', file.url);
  const url = res.path();
  await CameraRoll.saveToCameraRoll(url, 'photo');

  return true;
};


export const saveFileToDevice = (file: FileModule): Promise<boolean> => {
  return Platform.OS === 'ios' ? saveFileToIOS(file) : saveFileToAndroid(file);
};
