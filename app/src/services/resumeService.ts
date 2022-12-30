import {resumeApi} from '../api/resumeApi';
import {Resume} from '../models/Resume';
import {Vacancy} from '../models/Vacancy';
import {CreateResumeDTO, GetAllVacancyDTO} from '../types/workTypes';


const getAllResume = async (data: GetAllVacancyDTO): Promise<Resume[]> => {
  const res = await resumeApi.getAllResume(data);
  return res.data.vacancies.map((vacancy) => new Resume(vacancy));
};


const getResumeById = async (resumeId: number): Promise<Vacancy> => {
  const res = await resumeApi.getResumeById(resumeId);

  return new Vacancy(res.data.vacancy);
};


const createResume = async (data: CreateResumeDTO): Promise<Resume> => {
  const res = await resumeApi.createResume(data);

  return new Resume(res.data.vacancy);
};

const deleteResumeById = async (resumeId: number): Promise<Vacancy> => {
  const res = await resumeApi.deleteResumeById(resumeId);

  return new Vacancy(res.data.vacancy);
};


export const resumeService = {getAllResume, getResumeById, createResume, deleteResumeById};

