import {Alert} from 'react-native';
import {cityApi} from '../api/cityApi';
import {CityType} from '../types/userTypes';


const getCityByName = async (name: string): Promise<CityType[]> => {
  if (!name) {
    return [];
  }
  try {
    const data = await cityApi.getCitiesByName(name);
    return data.data.cities;
  } catch (e) {
    Alert.alert('Ошибка соеденения');
    throw new Error('Упс... что-то пошло не так');
  }
};


export const cityServices = {getCityByName};
