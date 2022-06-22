import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {WorkEnum} from '../constants/routerNames';
import ResumeList from '../screens/Work/ResumeList';
import VacancyList from '../screens/Work/VacancyList';

const Stack = createNativeStackNavigator();

const WorkNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={WorkEnum.WORK_VACANCY_LIST} component={VacancyList} />
      <Stack.Screen name={WorkEnum.WORK_RESUME_LIST} component={ResumeList} />
    </Stack.Navigator>
  );
};

export default WorkNavigator;
