import {makeAutoObservable, runInAction} from 'mobx';
import {Resume} from '../models/Resume';
import {Vacancy} from '../models/Vacancy';
import {resumeService} from '../services/resumeService';
import {vacancyService} from '../services/vacancyService';
import {CreateResumeDTO, CreateVacancyDTO, GetAllVacancyDataType} from '../types/workTypes';

export const LIMIT_TO_FETCH = 15;
class WorkStore {
  vacancy: Vacancy[] = [];
  vacancyOffset: number = 0;
  isNeverLoadingVacancy: boolean = true;
  isLoadingVacancy: boolean = false;

  isLoadingResume: boolean = false;
  resume: Resume[] = [];
  isNeverLoadingResume: boolean = true;
  resumeOffset: number = 0;


  constructor() {
    makeAutoObservable(this);
  }


  async fetchVacancy(data: GetAllVacancyDataType) {
    runInAction(() => {
      this.isLoadingVacancy = true;
    });
    const newVacancy = await vacancyService.getAllVacancy({
      data,
      options: {
        offset: this.vacancyOffset,
        limit: LIMIT_TO_FETCH,
      },
    });
    runInAction(() => {
      this.isLoadingVacancy = false;
      this.isNeverLoadingVacancy = false;
      this.vacancy = [...this.vacancy, ...newVacancy];
    });
  }


  async createVacancy(data: CreateVacancyDTO) {
    try {
      const vacancy = await vacancyService.createVacancy(data);
      runInAction(() => {
        this.vacancy.push(vacancy);
      });

      return false;
    } catch (e) {
      return true;
    }
  }


  clearVacancy() {
    this.vacancy =[];
  }


  async fetchResume(data: GetAllVacancyDataType) {
    runInAction(() => {
      this.isLoadingResume = true;
    });
    const resumes = await resumeService.getAllResume({
      data: data,
      options: {
        limit: LIMIT_TO_FETCH,
        offset: this.resumeOffset,
      },
    });
    runInAction(() => {
      this.isLoadingResume = false;
      this.isNeverLoadingResume = false;
      this.resume = [...this.resume, ...resumes];
    });
  }


  async createResume(data: CreateResumeDTO) {
    try {
      const vacancy = await resumeService.createResume(data);
      runInAction(() => {
        this.resume.push(vacancy);
      });
      return false;
    } catch (e) {
      return true;
    }
  }


  clearResume() {
    this.resume = [];
  }
}


export const workStore = new WorkStore();
