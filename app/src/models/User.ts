import {EducationType, GenderType, UserImageType, UserType} from '../types/userTypes';


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
  age?: number;
  education: EducationType;
  createdAt: Date;
  updatedAt: Date;
  images: UserImageType[];
  mainPhoto?: {
    id: number;
    image: UserImageType;
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
    this.howCanHelp = data.howCanHelp;
    this.needHelp = data.needHelp;
    this.gender = data.gender;
    this.email = data.email;
    this.interesting = data.interesting;
    this.patronomic = data.patronomic;
    this.age = data.age;
    this.education = data.education;
    this.createdAt = data.createdAt;
    this.mainPhoto = data.mainPhoto;
    this.images = data.images;
    this.updatedAt = data.updatedAt;
  }
}
