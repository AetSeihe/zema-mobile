import {makeAutoObservable} from 'mobx';


class ApplicationStore {
  appIsLoading = false;

  constructor() {
    makeAutoObservable(this);
  }
}


export const applicationStore = new ApplicationStore();
