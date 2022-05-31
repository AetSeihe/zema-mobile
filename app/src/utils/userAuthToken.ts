import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_AUTH_KEY = 'userAuthToken/USER_AUTH_KEY';


export type AuthUserDataType = {
  userId: number;
  token: string;
};

export const getAuthDataIfExist = async (): Promise<AuthUserDataType | null> => {
  const data = await AsyncStorage.getItem(USER_AUTH_KEY);

  if (data) {
    return JSON.parse(data);
  }

  return null;
};

export const setAuthUserData = async (data: AuthUserDataType): Promise<void> => {
  await AsyncStorage.setItem(USER_AUTH_KEY, JSON.stringify(data));
};


export const clearAuthUserData = async () => {
  await AsyncStorage.removeItem(USER_AUTH_KEY);
};
