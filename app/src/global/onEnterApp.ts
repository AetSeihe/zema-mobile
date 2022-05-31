import {setAuthorizationToken} from '../api/axiosInit';
import {routerNames} from '../constants/routerNames';
import {userStore} from '../store/userStore';
import {getAuthDataIfExist} from '../utils/userAuthToken';

export const onEnterApp = async () => {
  const authData = await getAuthDataIfExist();

  if (!authData) {
    return routerNames.SIGN_IN;
  }
  setAuthorizationToken(authData.token);
  userStore.signInById(authData.userId);

  return routerNames.HOME;
};
