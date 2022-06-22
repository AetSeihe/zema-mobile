import {makeAutoObservable, runInAction} from 'mobx';
import {Vacancy} from '../models/Vacancy';
import {workService} from '../services/workService';
import {GetAllVacancyDTO} from '../types/workTypes';


class WorkStore {
  vacancy: Vacancy[] = [];
  isLoadingVacancy: boolean = false;
  isNeverLoadingVacancy: boolean = true;


  constructor() {
    makeAutoObservable(this);
  }

  

  async fetchVacancy(data: GetAllVacancyDTO) {
    runInAction(() => {
      this.isLoadingVacancy = true;
    });
    const newVacancy = await workService.getAllVacancy(data);
    runInAction(() => {
      this.isLoadingVacancy = false;
      this.isNeverLoadingVacancy = false;
      this.vacancy = [...this.vacancy, ...newVacancy];
    });
  }


  clearVacancy() {
    this.vacancy =[];
  }
}


export const workStore = new WorkStore();
