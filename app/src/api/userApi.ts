import {AxiosResponse} from 'axios';
import {Asset} from 'react-native-image-picker';
import {AuthUserApiType, OneUserApiType, SignInDataType, SignUpDataType, UpdateProfileType} from '../types/userTypes';
import {axiosInstants, getApiConfig} from './axiosInit';

const signIn = (data: SignInDataType): Promise<AxiosResponse<AuthUserApiType>> => {
  return axiosInstants.post('auth/login', {
    username: data.login,
    password: data.password,
  });
};

const signUp = (data: SignUpDataType): Promise<AxiosResponse<AuthUserApiType>> => {
  return axiosInstants.post('auth/signup', data);
};

const getUserById = (id:number): Promise<AxiosResponse<OneUserApiType>> => {
  return axiosInstants.get(`user/${id}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const update = (data: UpdateProfileType): Promise<AxiosResponse<OneUserApiType>> => {
  const formData = new FormData();
  Object.keys(data).map((key: string) => {
    if (data[key]) {
      formData.append(key, data[key]);
    }
  });
  data.images.forEach((photo: Asset) => {
    formData.append('images', {uri: photo.uri, name: 'sadds', type: 'image/png'});
  });

  return axiosInstants({
    url: 'user/update',
    method: 'POST',
    data: formData,
    headers: {
      ...getApiConfig().headers,
      'Content-Type': 'multipart/form-data',
    },
  });

  // return axiosInstants.post('user/update', data);
};

export const userApi = {signIn, signUp, getUserById, update};
