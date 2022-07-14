import {setAuthorizationToken} from '../api/axiosInit';
import {userApi} from '../api/userApi';
import {User} from '../models/User';
import {GetAllUsersOptions, SignInDataType, SignUpDataType, UpdateProfileType, UserType} from '../types/userTypes';
import {setAuthUserData} from '../utils/userAuthToken';


const getAllUsersByOptions = async (data: GetAllUsersOptions): Promise<User[]> => {
  const res = await userApi.getAllUsersByOptions(data);
  return res.data.users.map((user) => new User(user));
};

const signIn = async (data: SignInDataType): Promise<UserType> => {
  try {
    const res = await userApi.signIn(data);
    const resData = res.data;
    await setAuthUserData({
      token: resData.token,
      userId: resData.user.id,
    });

    setAuthorizationToken(resData.token);

    return resData.user;
  } catch (e: any) {
    throw new Error('Пользователь не найден');
  }
};

const signUp = async (data: SignUpDataType): Promise<UserType> => {
  try {
    const res = await userApi.signUp(data);
    const resData = res.data;
    await setAuthUserData({
      token: resData.token,
      userId: resData.user.id,
    });
    setAuthorizationToken(resData.token);

    return resData.user;
  } catch (e: any) {
    throw new Error('Номер телефона или почта уже используется');
  }
};

const getUserById = async (id: number): Promise<User> => {
  try {
    const res = await userApi.getUserById(id);
    return new User(res.data.user);
  } catch (e) {
    throw new Error('Пользователь не найден');
  }
};

const update = async (data: UpdateProfileType): Promise<User> => {
  const res = await userApi.update(data);
  return new User(res.data.user);
};

const deletePhotoByName = async (photoName: string): Promise<void> => {
  try {
    await userApi.deletePhotoByName(photoName);
  } catch (e) {
  }
};


export const userService = {signIn, signUp, getUserById, update, getAllUsersByOptions, deletePhotoByName};
