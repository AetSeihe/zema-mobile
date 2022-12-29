import {routerNames} from '../constants/routerNames';
import {Post} from '../models/Post';
import {User} from '../models/User';
import {Vacancy} from '../models/Vacancy';


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

export type SettingsScreenType = {
    name: routerNames.SETTING,
    options?: {}
}

export type SettingsAccountScreenType = {
    name: routerNames.SETTING_ACCOUNT,
    options?: {}
}

export type SettingsSecurityScreenType = {
    name: routerNames.SETTING_SECURITY,
    options?: {}
}

export type SettingsLocationScreenType = {
    name: routerNames.SETTING_LOCATION,
    options?: {}
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
}

export type ChatItemOptionsScreenType = {
    userId: number,
}

export type ChatItemScreenType = {
    name: routerNames.Chat_Item,
    options: ChatItemOptionsScreenType
}

export type PostsScreenType = {
    name: routerNames.Posts,
    options?: {}

}


export type HomeScreenType = {
    name: routerNames.HOME,
    options?: {}
}

export type MyFriendScreenType = {
    name: routerNames.MY_FRIENDS,
    options?: {}
}

export type MyRequestsScreenType = {
    name: routerNames.FRIENDS_REQUEST,
    options?: {}
}

export type AskGeoPermissionType = {
    name: routerNames.ASK_GEO_PERMISSION,
    options?: {}
}

export type UserMapType = {
    name: routerNames.USER_MAP,
    options?: {}
}

export type BlockUsersType = {
    name: routerNames.BLOCK_USERS,
    options?: {}
}


export type VacancyOptionsType = {
    vacancy: Vacancy
}

export type VacancyType = {
    name: routerNames.VACANCY,
    options: VacancyOptionsType
}


export type RouterTabBarType = ChatScreenType | ChatScreenType | PostsScreenType


export type RouterType = ErrorScreenType |
                        SignInScreenType |
                        PostScreenType |
                        SignUpScreenType |
                        ProfileScreenType |
                        SettingsScreenType |
                        PostFormScreenType |
                        HomeScreenType |
                        ChatItemScreenType |
                        MyFriendScreenType |
                        MyRequestsScreenType |
                        AskGeoPermissionType |
                        UserMapType |
                        SettingsAccountScreenType |
                        SettingsSecurityScreenType |
                        SettingsLocationScreenType |
                        BlockUsersType |
                        VacancyType

