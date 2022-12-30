import {AxiosResponse} from 'axios';
import {CreateResumeDTO, GetAllResumeType, GetAllVacancyDTO, GetOneVacancyByApi, GetResumeById} from '../types/workTypes';
import {axiosInstants, getApiConfig} from './axiosInit';


const getAllResume = async (data: GetAllVacancyDTO): Promise<AxiosResponse<GetAllResumeType>> => {
  return axiosInstants.post('resume/all', data, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};


const getResumeById = async (vacancyId: number): Promise<AxiosResponse<GetOneVacancyByApi>> => {
  return axiosInstants.get(`resume/${vacancyId}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const createResume = async (data: CreateResumeDTO): Promise<AxiosResponse<GetResumeById>> => {
  return axiosInstants.post(`resume/create`, data, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};

const deleteResumeById = async (vacancyId: number): Promise<AxiosResponse<GetOneVacancyByApi>> => {
  return axiosInstants.delete(`resume/${vacancyId}`, {
    headers: {
      ...getApiConfig().headers,
    },
  });
};


export const resumeApi = {getAllResume, getResumeById, createResume, deleteResumeById};
