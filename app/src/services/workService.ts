import {workApi} from '../api/workApi';
import {Vacancy} from '../models/Vacancy';
import {CreateResumeDTO, GetAllVacancyDTO} from '../types/workTypes';


const getAllVacancy = async (data: GetAllVacancyDTO): Promise<Vacancy[]> => {
  const res = await workApi.getAllVacancy(data);

  return res.data.vacancies.map((vacancy) => new Vacancy(vacancy));
};


const getVacancyById = async (vacancyId: number): Promise<Vacancy> => {
  const res = await workApi.getVacancyById(vacancyId);

  return new Vacancy(res.data.vacancy);
};


const createVacancy = async (data: CreateResumeDTO): Promise<Vacancy> => {
  const res = await workApi.createVacancy(data);

  return new Vacancy(res.data.vacancy);
};

const deleteVacancyById = async (vacancyId: number): Promise<Vacancy> => {
  const res = await workApi.deleteVacancyById(vacancyId);

  return new Vacancy(res.data.vacancy);
};


export const workService = {getAllVacancy, getVacancyById, createVacancy, deleteVacancyById};
