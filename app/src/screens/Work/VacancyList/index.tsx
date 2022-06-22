import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {workStore} from '../../../store/workStore';
import {GetAllVacancyDataType, GetAllVacancyDTO} from '../../../types/workTypes';
import VacancyFilter from '../components/VacancyFilter';
import VacantyItem from '../components/VacantyItem';
import {styles} from './styles';

const initialOptions: GetAllVacancyDTO = {
  options: {},
  data: {},
};

const VacancyList = () => {
  const [options] = useState(initialOptions);

  useEffect(() => {
    if (workStore.isNeverLoadingVacancy) {
      workStore.fetchVacancy(options);
    }
  }, []);

  const handleSubmit = (data: GetAllVacancyDataType) => {
    workStore.clearVacancy();
    workStore.fetchVacancy({
      data: data,
      options: {},
    });
  };

  const onPressCard = () => {};
  return (
    <View style={styles.wrapper}>
      <FlatList
        ListHeaderComponent={<VacancyFilter onSubmit={handleSubmit} initialOptions={options.data}/>}
        style={styles.listWrapper}
        data={workStore.vacancy}
        renderItem={({item}) => <VacantyItem onPressCard={onPressCard} data={item} wrapperStyle={styles.cardItem}/>}
      />
    </View>
  );
};

export default observer(VacancyList);
