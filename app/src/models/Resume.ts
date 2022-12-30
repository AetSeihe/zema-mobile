import {CityType} from '../types/userTypes';
import {EmploymentType, ResumeSkill, ResumeType, WorkFormatType} from '../types/workTypes';
import {User} from './User';

export class Resume {
  id: number;
  title: string;
  salary: number;
  workExperience: number;
  description: string;
  employment: EmploymentType;
  workFormat: WorkFormatType;
  cityId: number;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  city: CityType;
  resumeSkills: ResumeSkill[];
  user: User;

  constructor(data: ResumeType) {
    this.id = data.id;
    this.title = data.title;
    this.salary = data.salary;
    this.workExperience = data.workExperience;
    this.description = data.description;
    this.employment = data.employment;
    this.workFormat = data.workFormat;
    this.cityId = data.cityId;
    this.phone = data.phone;
    this.email = data.email;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.userId = data.userId;
    this.city = data.city;
    this.resumeSkills = data.resumeSkills;
    this.user = new User(data.user);
  }
}
