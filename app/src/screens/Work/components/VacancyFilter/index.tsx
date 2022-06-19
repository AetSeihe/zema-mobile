import {Text} from '@react-native-material/core';
import React from 'react';
import {View} from 'react-native';
import {GetAllVacancyDTO} from '../../../../types/workTypes';

type Props = {
    onSubmit: (data: GetAllVacancyDTO) => void,
    initialOptions: GetAllVacancyDTO
}

const VacancyFilter = ({onSubmit, initialOptions}: Props) => {
  return (
    <View>
      <Text>Фильтееdsdер</Text>
    </View>
  );
};

export default VacancyFilter;
