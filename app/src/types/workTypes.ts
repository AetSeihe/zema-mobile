import {CityType, UserType} from './userTypes';


export type GetOneVacancyByApi = {
    message: string;
    vacancy: VacancyType
}

export type GetManyVacancyByApi = {
    message: string;
    vacancies: VacancyType[]
}

export interface VacancyType {
        id: number;
        userId: number;
        title: string;
        description: string;
        workExperience: number;
        cityId: number;
        phone: string;
        email: string;
        salary: number;
        user: UserType;
        city: CityType;
        updatedAt: string;
        createdAt: string;
    }


export type GetAllVacancyDataType = {
  text?: string;
  salaryMin?: number;
  salaryMax?: number;
  minWorkExpirency?: number;
  maxWorkExpirency?: number;
  cityId?: number;
}
export type GetAllVacancyOptionsType = {
  limit?: number;
  offset?: number;
}

export type GetAllVacancyDTO = {
    data: GetAllVacancyDataType;
    options: GetAllVacancyOptionsType;
}

export type CreateVacancyDTO = {
  title: string;
  salary: number;
  workExperience: number;
  description: string;
  cityId: number;
  phone?: string;
  email?: string;
}

export type CreateResumeDTO = {
    title: string;
    salary: number;
    workExperience: number;
    description: string;
    experience: string;
    cityId: number;
    phone?: string;
    email?: string;
  }
