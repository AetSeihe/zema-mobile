import {routerNames} from '../constants/routerNames';


export type ErrorScreenOptionsType = {
    title: string;
    description?: string;
    buttonText: string;
}

export type ErrorScreenType = {
    name: routerNames.ERROR,
    options: ErrorScreenOptionsType
}

export type SignInScreenType = {
    name: routerNames.SIGN_IN,
    options?: {}
}

export type SignUpScreenType = {
    name: routerNames.SIGN_UP,
    options?: {}
}


export type HomeScreenType = {
    name: routerNames.HOME,
    options?: {}

}


export type RouterType = ErrorScreenType | SignInScreenType | HomeScreenType | SignUpScreenType
