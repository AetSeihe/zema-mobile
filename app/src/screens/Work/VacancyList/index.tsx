import {Button} from '@react-native-material/core';
import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {WorkEnum} from '../../../constants/routerNames';
import {workStore} from '../../../store/workStore';
import {GetAllVacancyDataType} from '../../../types/workTypes';
import VacancyFilter from '../components/VacancyFilter';
import VacantyItem from '../components/VacantyItem';
import {styles} from './styles';

const initialOptions: GetAllVacancyDataType = {
};
const LIMIT_FETCH_VACANCY = 15;


type Props = {
  navigation: NavigationProp<any>
}

const VacancyList = ({navigation}: Props) => {
  const [options, setOptions] = useState(initialOptions);
  const offset = useRef(0);

  useEffect(() => {
    if (workStore.isNeverLoadingVacancy) {
      workStore.fetchVacancy({
        data: options,
        options: {
          limit: LIMIT_FETCH_VACANCY,
          offset: offset.current,
        },
      });
      offset.current += LIMIT_FETCH_VACANCY;
    }
  }, []);

  const handleSubmit = (data: GetAllVacancyDataType) => {
    setOptions(data);
    workStore.clearVacancy();
    workStore.fetchVacancy({
      data: data,
      options: {
        limit: LIMIT_FETCH_VACANCY,
      },
    });
  };

  const onScroll = () => {
    workStore.fetchVacancy({
      data: options,
      options: {
        limit: LIMIT_FETCH_VACANCY,
        offset: offset.current,
      },
    });
    offset.current += LIMIT_FETCH_VACANCY;
  };

  const onPressCard = () => {};

  const onPressSwitchWork = () => {
    navigation.navigate(WorkEnum.WORK_RESUME_LIST);
  };

  return (
    <View style={styles.wrapper}>
      <Button title='Резюме' onPress={onPressSwitchWork}/>
      <FlatList
        onEndReached={onScroll}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={<VacancyFilter onSubmit={handleSubmit} initialOptions={options} title='Вакансии'/>}
        style={styles.listWrapper}
        data={workStore.vacancy}
        renderItem={({item}) => <VacantyItem onPressCard={onPressCard} data={item} wrapperStyle={styles.cardItem}/>}
      />
    </View>
  );
};

export default observer(VacancyList);
