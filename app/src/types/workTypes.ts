import {CityType, UserType} from './userTypes';


export type GetOneVacancyByApi = {
    message: string;
    vacancy: VacancyType
}

export type GetManyVacancyByApi = {
    message: string;
    vacancies: VacancyType[]
}

export type GetAllResumeType = {
  message: string;
  vacancies: ResumeType[],
}

export type GetResumeById = {
  message: string;
  vacancy: ResumeType
}


export type EmploymentType = 'fulltime' | 'partTime';
export type WorkFormatType = 'office' | 'remote' | 'hybrid';
export type SkillsType ={
  id: number;
  title: string
};


export interface VacancyType {
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
        employment: EmploymentType;
        workFormat: WorkFormatType;
        companyName: string;
        descriptionCompany: string;
        companyUrl: string;
        requirement: string;
        responsibilities: string;
        skills: SkillsType[];
        user: UserType;
        city: CityType;
        updatedAt: string;
        createdAt: string;

    }


export type GetAllVacancyDataType = {
  text?: string;
  salaryMin?: number;
  salaryMax?: number;
  minWorkExpirency?: number;
  maxWorkExpirency?: number;
  cityId?: number;
}
export type GetAllVacancyOptionsType = {
  limit?: number;
  offset?: number;
}

export type GetAllVacancyDTO = {
    data: GetAllVacancyDataType;
    options: GetAllVacancyOptionsType;
}

export type CreateVacancyDTO = {
  title: string;
  minSalary: number;
  maxSalary: number;
  workExperience: number;
  description: string;
  cityId?: number | null;
  skills: string[];
  employment: EmploymentType;
  workFormat: WorkFormatType;
  requirement: string;
  responsibilities: string;
  companyName: string;
  descriptionCompany: string;
  companyUrl: string;
}

export type CreateResumeDTO = {
    title: string;
    salary: number;
    workExperience: number;
    description: string;
    cityId?: number;
    skills: string[],
  }


export type ResumeSkill = {
    id: number;
    title: string;
    resumeId: number;
    createdAt: string;
    updatedAt: string;
}

export type ResumeType = {
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
    createdAt: string;
    updatedAt: string;
    userId: number;
    city: CityType;
    resumeSkills: ResumeSkill[];
    user: UserType;
}
