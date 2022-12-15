import {AxiosResponse} from 'axios';
import {Asset} from 'react-native-image-picker';
import {AuthUserApiType, GetAllUsersOptions, GetUsersArray, OneUserApiType, SignInDataType, SignUpDataType, UpdateProfileType} from '../types/userTypes';
import {axiosInstants, getApiConfig} from './axiosInit';


const getAllUsersByOptions = (data: GetAllUsersOptions): Promise<AxiosResponse<GetUsersArray>> => {
  return axiosInstants.get('user/all', {
    headers: {
      ...getApiConfig().headers,
    },
    params: data,
  });
};


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

const deletePhotoByName = (photoName: string): Promise<AxiosResponse<void>> => {
  return axiosInstants.delete(`user/image`, {
    headers: {
      ...getApiConfig().headers,
    },
    data: {
      photo_name: photoName,
    },
  });
};

const update = ({images = [], ...data}: UpdateProfileType): Promise<AxiosResponse<OneUserApiType>> => {
  const formData = new FormData();
  Object.keys(data).map((key: string) => {
    if (data[key]) {
      formData.append(key, data[key]);
    }
  });
  images.forEach((photo: Asset) => {
    formData.append('preview', {uri: photo.uri, name: 'sadds', type: 'image/png'});
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
};


export const userApi = {signIn, signUp, getUserById, update, getAllUsersByOptions, deletePhotoByName};
