
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


export type OneUserApiType = {
    message: string;
    user: UserType;
}

export type AuthUserApiType = {
    message: string;
    token: string;
    user: UserType;
}

export type UserType = {
    id: number;
    name: string;
    phone: string;
    email: string;
    isUpdateProfile: boolean;
    surname: null;
    patronomic: null;
    currentCityID: null;
    birthCityID: null;
    work: null;
    howCanHelp: null;
    needHelp: null;
    gender: string;
    interesting: null;
    age: number;
    education: string;
    createdAt: Date;
    updatedAt: Date;
    images: any[];
    mainPhoto: null;
}
