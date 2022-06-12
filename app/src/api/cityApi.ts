import {AxiosResponse} from 'axios';
import {CitiesByNameResponse} from '../types/cityType';
import {axiosInstants} from './axiosInit';


const getCitiesByName = (name: string): Promise<AxiosResponse<CitiesByNameResponse>>=> {
  return axiosInstants.get(`city/by-name/${name}`);
};


export const cityApi = {getCitiesByName};

