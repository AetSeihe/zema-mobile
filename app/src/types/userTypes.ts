import {Asset} from 'react-native-image-picker';


export type GetAllUsersOptions = {
    name?: string,
      work?: string;
      currentCityId?: number;
      birthCityId?: number;
      minAge?: number;
      maxAge?: number;
      gender?: string;
      education?: string;
      limit: number;
      offset: number;
}

export type SignInDataType = {
    login: string,
    password: string;
}

export type SignUpDataType = {
    name: string;
    phone: string;
    email: string;
    password: string;
}

export type UpdateProfileType = {
    images?: Asset[];
    name?: string;
    phone?: string;
    mainPhotoId?: number | null;
    password?: string;
    email?: string;
    currentCityId?: number | null;
    birthCityId?: number | null;
    work?: string;
    how_can_help?: string;
    need_help?: string;
    gender?: GenderType;
    education?: EducationType | string;
    surname?: string;
    patronomic?: string;
    interesting?: string;
    cordX?: number | null;
    cordY?: number | null;
    birthday?: string;
    [x: string]: any;
}

export type OneUserApiType = {
    message: string;
    user: UserType;
}

export type AuthUserApiType = {
    message: string;
    token: string;
    user: UserType;
}

export type GetUsersArray = {
    message: string;
    users: UserType[];
    allCount?: number
}


export type GenderType = 'null' | 'male' | 'female'

export type EducationType = 'null'
| 'average'
| 'secondary_special'
| 'secondary_special'
| 'unfinished_higher_education'
| 'higher'
| 'bachelor_degree'
| 'master'
| 'candidate'
| 'doctor'


export type UserImageType = {
    id: number;
    fileName: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export type CityType = {
    id: number,
    regionId: number,
    title: string;
}

export type UserType = {
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
    how_can_help?: string;
    need_help?: string;
    gender: GenderType;
    interesting?: string;
    birthday?: string;
    education: string;
    createdAt: Date;
    updatedAt: Date;
    birthCity?: CityType;
    currentCity?: CityType;
    images: UserImageType[] | undefined;
    cordX?: number;
    cordY?: number;
    mainPhoto?: {
      id: number;
      image: UserImageType;
    };
}
