import {Button} from '@react-native-material/core';
import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {CatAlert} from '../../../components/CatAlert';
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

const ResumeList = ({navigation}: Props) => {
  const [options, setOptions] = useState(initialOptions);
  const offset = useRef(0);

  useEffect(() => {
    if (workStore.isNeverLoadingResume) {
      workStore.fetchResume({
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
    workStore.clearResume();
    workStore.fetchResume({
      data: data,
      options: {
        limit: LIMIT_FETCH_VACANCY,
        offset: 0,
      },
    });
    offset.current = LIMIT_FETCH_VACANCY;
  };

  const onScroll = () => {
    workStore.fetchResume({
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
    navigation.navigate(WorkEnum.WORK_VACANCY_LIST);
  };

  console.log('Вот сколько у меня резюме нах!', workStore.resume.length);
  return (
    <View style={styles.wrapper}>
      <Button title='Вакансии' onPress={onPressSwitchWork}/>
      <FlatList
        onEndReached={onScroll}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={<CatAlert title='Вы просмотрели все доступные резюме'/>}
        ListHeaderComponent={<VacancyFilter title='Резюме' onSubmit={handleSubmit} initialOptions={options}/>}
        style={styles.listWrapper}
        data={workStore.resume}
        renderItem={({item}) => <VacantyItem onPressCard={onPressCard} data={item} wrapperStyle={styles.cardItem}/>}
      />
    </View>
  );
};

export default observer(ResumeList);
