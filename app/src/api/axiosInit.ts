import axios, {AxiosError} from 'axios';
import {routerNames} from '../constants/routerNames';
import {locale} from '../locale';
import {routerStore} from '../store/routerStore';

const authErrorLocale = locale.errors.authError;

const apiConfig = {
  headers: {
    'Authorization': '',
  },
};

export const setAuthorizationToken = (token: string) => {
  apiConfig.headers.Authorization = `Bearer ${token}`;
};

export const getApiConfig = () => {
  return apiConfig;
};


const axiosInstants = axios.create({
  baseURL: 'http://194.67.74.122:3000',
});

axiosInstants.interceptors.response.use(function(response) {
  return response;
}, function(error: AxiosError<any>) {
  if (error.response?.data.statusCode == '401') {
    routerStore.pushToScene({
      name: routerNames.ERROR,
      options: {
        title: authErrorLocale.title,
        description: authErrorLocale.description,
        buttonText: authErrorLocale.button,
      },
    });
  }
  return Promise.reject(error);
});


export {axiosInstants};
