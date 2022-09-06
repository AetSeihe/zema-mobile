import {AxiosResponse} from 'axios';
import {CreateVacancyDTO, GetAllVacancyDTO, GetManyVacancyByApi, GetOneVacancyByApi} from '../types/workTypes';
import {axiosInstants, getApiConfig} from './axiosInit';


const getAllVacancy = async (data: GetAllVacancyDTO): Promise<AxiosResponse<GetManyVacancyByApi>> => {
  return axiosInstants.post('vacancy/all', data, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};


const getVacancyById = async (vacancyId: number): Promise<AxiosResponse<GetOneVacancyByApi>> => {
  return axiosInstants.get(`vacancy/${vacancyId}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const createVacancy = async (data: CreateVacancyDTO): Promise<AxiosResponse<GetOneVacancyByApi>> => {
  console.log(JSON.stringify(data, null, 2));
  return axiosInstants.post(`vacancy/create`, data, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const deleteVacancyById = async (vacancyId: number): Promise<AxiosResponse<GetOneVacancyByApi>> => {
  return axiosInstants.delete(`vacancy/${vacancyId}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};


export const vacancyApi = {getAllVacancy, getVacancyById, createVacancy, deleteVacancyById};
