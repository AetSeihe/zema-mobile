import axios, {AxiosError} from 'axios';
import {serverUrl} from '../constants/root';
import {routerNames} from '../constants/routerNames';
import {locale} from '../locale';
import {routerStore} from '../store/routerStore';
import RNRestart from 'react-native-restart';

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
  baseURL: serverUrl,
});

axiosInstants.interceptors.request.use(function(request) {
  return request;
}, function(error: AxiosError<any>) {
  return Promise.reject(error);
});

axiosInstants.interceptors.response.use(function(response) {
  return response;
}, function(error: AxiosError<any>) {
  if (error.message === 'Network Error') {
    routerStore.pushToScene({
      name: routerNames.ERROR,
      options: {
        title: locale.network.title,
        description: locale.network.description,
        buttonText: 'Перезагрузить приложение',
        // eslint-disable-next-line new-cap
        onPressButton: () => RNRestart.Restart(),
      },
    });
    if (error.response?.data.message) {
      error.response.data.message= 'Ошибка соеденения с сервером';
    }
  }
  if (error.response?.data.statusCode == '401') {
    routerStore.pushToScene({
      name: routerNames.ERROR,
      options: {
        title: authErrorLocale.title,
        description: authErrorLocale.description,
        buttonText: authErrorLocale.button,
        onPressButton: () => routerStore.pushToScene({
          name: routerNames.SIGN_IN,
        }),
      },
    });
  }
  return Promise.reject(error);
});


export {axiosInstants};
