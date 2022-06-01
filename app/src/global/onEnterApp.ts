import {setAuthorizationToken} from '../api/axiosInit';
import {routerNames} from '../constants/routerNames';
import {applicationStore} from '../store/applicationStore';
import {userStore} from '../store/userStore';
import {getAuthDataIfExist} from '../utils/userAuthToken';

export const onEnterApp = async () => {
  const authData = await getAuthDataIfExist();

  console.log('!authData', !authData);

  if (!authData) {
    applicationStore.appIsLoading = true;
    return routerNames.SIGN_IN;
  }

  console.log('!!!!!!!======!!!!!!!', !authData);


  setAuthorizationToken(authData.token);
  userStore.signInById(authData.userId);
  return routerNames.HOME;
};
