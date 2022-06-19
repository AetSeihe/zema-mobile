import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {workStore} from '../../../store/workStore';
import {GetAllVacancyDTO} from '../../../types/workTypes';
import VacancyFilter from '../components/VacancyFilter';
import VacantyItem from '../components/VacantyItem';
import {styles} from './styles';

const initialOptions: GetAllVacancyDTO = {
  options: {},
  data: {},
};

const VacancyList = () => {
  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    if (workStore.isNeverLoadingVacancy) {
      workStore.fetchVacancy(options);
    }
  }, []);

  const handleSubmit = (data: GetAllVacancyDTO) => {
    setOptions(data);
  };

  const onPressCard = () => {};
  return (
    <View style={styles.wrapper}>
      <VacancyFilter onSubmit={handleSubmit} initialOptions={options}/>
      <FlatList
        style={styles.listWrapper}
        data={workStore.vacancy}
        renderItem={({item}) => <VacantyItem onPressCard={onPressCard} data={item}/>}
      />
    </View>
  );
};

export default observer(VacancyList);
