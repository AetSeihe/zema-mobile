import {AxiosResponse} from 'axios';
import {GetAllPostsApiType, GetAllPostsOptions} from '../types/postTypes';
import {axiosInstants, getApiConfig} from './axiosInit';


const getAllPostsByOptions = (data: GetAllPostsOptions): Promise<AxiosResponse<GetAllPostsApiType>> => {
  return axiosInstants.get('post/all', {
    headers: {
      ...getApiConfig().headers,
      'Content-type': 'application/json',
    },
    params: JSON.stringify(data),
  });
};


export const postApi = {getAllPostsByOptions};
