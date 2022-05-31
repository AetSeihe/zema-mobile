import {userApi} from '../api/userApi';
import {SignInDataType, SignUpDataType, UserType} from '../types/userTypes';
import {setAuthUserData} from '../utils/userAuthToken';


const signIn = async (data: SignInDataType): Promise<UserType> => {
  try {
    const res = await userApi.signIn(data);
    const resData = res.data;
    setAuthUserData({
      token: resData.token,
      userId: resData.user.id,
    });

    return resData.user;
  } catch (e: any) {
    console.log(e.response.data);
    throw new Error('Пользователь не найден');
  }
};

const signUp = async (data: SignUpDataType): Promise<UserType> => {
  try {
    const res = await userApi.signUp(data);
    const resData = res.data;
    setAuthUserData({
      token: resData.token,
      userId: resData.user.id,
    });

    return resData.user;
  } catch (e: any) {
    console.log('error e ', e.response.data);
    throw new Error(e.response.data.message);
  }
};

const getUserById = async (id: number): Promise<UserType> => {
  try {
    const res = await userApi.getUserById(id);
    return res.data.user;
  } catch (e) {
    throw new Error('Пользователь не найден');
  }
};


export const userService = {signIn, signUp, getUserById};
