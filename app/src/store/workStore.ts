import {makeAutoObservable, runInAction} from 'mobx';
import {Vacancy} from '../models/Vacancy';
import {resumeService} from '../services/resumeService';
import {vacancyService} from '../services/vacancyService';
import {CreateResumeDTO, GetAllVacancyDTO} from '../types/workTypes';


class WorkStore {
  vacancy: Vacancy[] = [];
  resume: Vacancy[] = [];
  isLoadingVacancy: boolean = false;
  isLoadingResume: boolean = false;
  isNeverLoadingVacancy: boolean = true;
  isNeverLoadingResume: boolean = true;


  constructor() {
    makeAutoObservable(this);
  }


  async fetchVacancy(data: GetAllVacancyDTO) {
    runInAction(() => {
      this.isLoadingVacancy = true;
    });
    const newVacancy = await vacancyService.getAllVacancy(data);
    runInAction(() => {
      this.isLoadingVacancy = false;
      this.isNeverLoadingVacancy = false;
      this.vacancy = [...this.vacancy, ...newVacancy];
    });
  }


  async createVacancy(data: CreateResumeDTO) {
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


  async fetchResume(data: GetAllVacancyDTO) {
    runInAction(() => {
      this.isLoadingVacancy = true;
    });
    const newVacancy = await resumeService.getAllResume(data);
    runInAction(() => {
      this.isLoadingResume = false;
      this.isNeverLoadingResume = false;
      this.resume = [...this.resume, ...newVacancy];
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
    this.resume =[];
  }
}


export const workStore = new WorkStore();
