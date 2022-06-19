import {CityType} from '../types/userTypes';
import {VacancyType} from '../types/workTypes';
import {User} from './User';


export class Vacancy {
  id: number;
  userId: number;
  title: string;
  description: string;
  workExperience: number;
  cityId: number;
  phone: string;
  email: string;
  salary: number;
  user: User;
  city: CityType;
  updatedAt: Date;
  createdAt: Date;

  constructor(data: VacancyType) {
    this.id = data.id;
    this.userId = data.userId;
    this.title = data.title;
    this.description = data.description;
    this.workExperience = data.workExperience;
    this.cityId = data.cityId;
    this.phone = data.phone;
    this.email = data.email;
    this.salary = data.salary;
    this.city = data.city;
    this.salary = data.salary;
    this.user = new User(data.user);
    this.updatedAt = new Date(data.updatedAt);
    this.createdAt = new Date(data.createdAt);
  }
}
