import {CityType} from '../types/userTypes';
import {EmploymentType, SkillsType, VacancyType, WorkFormatType} from '../types/workTypes';
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
  minSalary: number;
  maxSalary: number;
  user: User;
  city: CityType;
  updatedAt: Date;
  createdAt: Date;
  employment: EmploymentType;
  workFormat: WorkFormatType;
  companyName: string;
  descriptionCompany: string;
  companyUrl: string;
  requirement: string;
  responsibilities: string;
  skills: SkillsType[];


  constructor(data: VacancyType) {
    this.id = data.id;
    this.userId = data.userId;
    this.title = data.title;
    this.description = data.description;
    this.workExperience = data.workExperience;
    this.cityId = data.cityId;
    this.phone = data.phone;
    this.email = data.email;
    this.minSalary = data.minSalary;
    this.maxSalary = data.maxSalary;
    this.employment = data.employment;
    this.workFormat = data.workFormat;
    this.companyName = data.companyName;
    this.descriptionCompany = data.descriptionCompany;
    this.companyUrl = data.companyUrl;
    this.requirement = data.requirement;
    this.skills =data.skills;
    this.responsibilities = data.responsibilities;
    this.city = data.city;
    this.user = new User(data.user);
    this.updatedAt = new Date(data.updatedAt);
    this.createdAt = new Date(data.createdAt);
  }
}
