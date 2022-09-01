import {CityType, EducationType, GenderType, UserType} from '../types/userTypes';
import {dateToString} from '../utils/dateToString';
import {FileModule} from './FileModule';

type GendersLiteralType = {
  // eslint-disable-next-line no-unused-vars
  [key in GenderType]: string;
};

export const GENDER_LITERAL: GendersLiteralType = {
  null: 'Не указан',
  male: 'муж',
  female: 'жен',
};

export type EducationsLiteralType = {
  // eslint-disable-next-line no-unused-vars
  [key in EducationType]: string;
};

export const EDUCATION_LITERAL: EducationsLiteralType = {
  null: 'Не указан',
  average: 'Среднее',
  secondary_special: 'Колледж',
  unfinished_higher_education: 'Незаконченное высшее',
  higher: 'Высшее',
  bachelor_degree: 'Бакалавриат',
  master: 'Магистратура',
  candidate: 'Кандидат наук',
  doctor: 'Доктор наук',
};

export class User {
  id: number;
  name: string;
  phone: string;
  email: string;
  isUpdateProfile: boolean;
  surname?: string;
  patronomic?: string;
  currentCityID?: number;
  birthCityID?: number;
  work?: string;
  howCanHelp?: string;
  needHelp?: string;
  gender: GenderType;
  interesting?: string;
  birthday?: Date;
  education: EducationType;
  createdAt: Date;
  updatedAt: Date;
  birthCity?: CityType;
  currentCity?: CityType;
  cordX?: number;
  cordY?: number;

  images: FileModule[] = [];
  mainPhoto?: {
    id: number;
    image: FileModule;
  };

  constructor(data: UserType) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.isUpdateProfile = data.isUpdateProfile;
    this.surname = data.surname;
    this.currentCityID = data.currentCityID;
    this.birthCityID = data.birthCityID;
    this.work = data.work;
    this.howCanHelp = data.how_can_help;
    this.needHelp = data.need_help;
    this.gender = data.gender;
    this.email = data.email;
    this.interesting = data.interesting;
    this.patronomic = data.patronomic;
    this.birthday = new Date(data.birthday || 0);
    this.education = data.education;
    this.createdAt = data.createdAt;
    this.birthCity = data.birthCity;
    this.currentCity = data.currentCity;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.cordX = data.cordX;
    this.cordY = data.cordY;

    const mainPhoto = data.mainPhoto;

    if (mainPhoto) {
      this.mainPhoto = {
        id: mainPhoto.id,
        image: new FileModule({
          id: mainPhoto.image.id,
          fileName: mainPhoto.image.fileName,
        }),
      };
    }

    if (data.images) {
      this.images = data.images.map((file) => new FileModule({
        id: file.id,
        fileName: file.fileName,
      }));
    }
  }

  get fullName(): string {
    return `${this.name} ${this.surname || ''}`;
  }


  get nameOfGender() {
    return GENDER_LITERAL[this.gender] || GENDER_LITERAL.null;
  }

  get nameOfEducation() {
    return EDUCATION_LITERAL[this.education] || EDUCATION_LITERAL.null;
  }


  get age() {
    if (!this.birthday) {
      return '';
    }

    if (this.birthday.getMonth() > new Date().getMonth()) {
      return new Date().getFullYear() - this.birthday.getFullYear() - 1;
    }

    return new Date().getFullYear() - this.birthday.getFullYear();
  }

  get currentBirthDay() {
    if (!this.birthday) {
      return '';
    }
    return dateToString(this.birthday);
  }
}
