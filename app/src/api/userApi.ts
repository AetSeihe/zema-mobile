import {AxiosResponse} from 'axios';
import {AuthUserApiType, SignInDataType, SignUpDataType} from '../types/userTypes';
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

const getUserById = (id:number): Promise<AxiosResponse<AuthUserApiType>> => {
  return axiosInstants.get(`user/${id}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

export const userApi = {signIn, signUp, getUserById};
