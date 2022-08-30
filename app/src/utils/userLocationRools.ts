import AsyncStorage from '@react-native-async-storage/async-storage';


const USER_LOCATION_USER_KEY = 'USER_LOCATION_USER_KEY';

export type UserLocationRulesType = {
  canShowLocation: boolean;
  canUpdateLocation: boolean;
}


const initialValues: UserLocationRulesType = {
  canUpdateLocation: false,
  canShowLocation: false,
};

export const setUserLocationRules = async (data: UserLocationRulesType) => {
  await AsyncStorage.setItem(USER_LOCATION_USER_KEY, JSON.stringify(data));
};


export const getUserLocationRules = async (): Promise<UserLocationRulesType> => {
  const data = await AsyncStorage.getItem(USER_LOCATION_USER_KEY);
  return JSON.parse(data || '') || initialValues;
};
