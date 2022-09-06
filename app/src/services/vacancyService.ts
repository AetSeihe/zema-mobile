import {vacancyApi} from '../api/vacancyApi';
import {Vacancy} from '../models/Vacancy';
import {CreateVacancyDTO, GetAllVacancyDTO} from '../types/workTypes';


const getAllVacancy = async (data: GetAllVacancyDTO): Promise<Vacancy[]> => {
  const res = await vacancyApi.getAllVacancy(data);

  return res.data.vacancies.map((vacancy) => new Vacancy(vacancy));
};


const getVacancyById = async (vacancyId: number): Promise<Vacancy> => {
  const res = await vacancyApi.getVacancyById(vacancyId);

  return new Vacancy(res.data.vacancy);
};


const createVacancy = async (data: CreateVacancyDTO): Promise<Vacancy> => {
  const res = await vacancyApi.createVacancy(data);
  return new Vacancy(res.data.vacancy);
};

const deleteVacancyById = async (vacancyId: number): Promise<Vacancy> => {
  const res = await vacancyApi.deleteVacancyById(vacancyId);

  return new Vacancy(res.data.vacancy);
};


export const vacancyService = {getAllVacancy, getVacancyById, createVacancy, deleteVacancyById};
