import {setAuthorizationToken} from '../api/axiosInit';
import {routerNames} from '../constants/routerNames';
import {applicationStore} from '../store/applicationStore';
import {userStore} from '../store/userStore';
import {getAuthDataIfExist} from '../utils/userAuthToken';

export const onEnterApp = async () => {
  const authData = await getAuthDataIfExist();
  if (!authData) {
    applicationStore.appIsLoading = true;
    return routerNames.SIGN_IN;
  }


  setAuthorizationToken(authData.token);
  await userStore.signInById(authData.userId);
  applicationStore.appIsLoading = true;
  return routerNames.HOME;
};
