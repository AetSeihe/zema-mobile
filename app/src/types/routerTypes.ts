import {routerNames} from '../constants/routerNames';
import {Chat} from '../models/Chat';
import {Post} from '../models/Post';
import {User} from '../models/User';


export type ErrorScreenOptionsType = {
    title: string;
    description?: string;
    buttonText: string;
    onPressButton: () => void;
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

export type ProfileScreenOptionsType = {
    user: User
}

export type ProfileScreenType = {
    name: routerNames.PROFILE,
    options: ProfileScreenOptionsType
}

export type ProfileSettingsScreenType = {
    name: routerNames.PROFILE_SETTING,
    options: {}
}

export type PostScreenOptionsType = {
  post: Post,
};
export type PostScreenType = {
    name: routerNames.Post,
    options: PostScreenOptionsType
}

export type PostFormScreenType = {
    name: routerNames.POST_FORM,
    options?: {}
}


export type ChatScreenType = {
    name: routerNames.Chat,
    options: {
        user?: User,
        chat: Chat,
    }
}


export type PostsScreenType = {
    name: routerNames.Posts,
    options?: {}

}


export type FormSelectScreenType = {
    name: routerNames.FORM_SELECT,
    options?: {}

}

export type VacancyFormScreenType = {
    name: routerNames.VACANCY_FORM,
    options?: {}
}

export type HomeScreenType = {
    name: routerNames.HOME,
    options?: {}
}


export type RouterTabBarType = ChatScreenType | ChatScreenType | PostsScreenType


export type RouterType = ErrorScreenType |
                        SignInScreenType |
                        PostScreenType |
                        SignUpScreenType |
                        ProfileScreenType |
                        ProfileSettingsScreenType |
                        PostFormScreenType |
                        FormSelectScreenType |
                        VacancyFormScreenType |
                        HomeScreenType
