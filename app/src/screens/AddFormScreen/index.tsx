import React from 'react';
import {View} from 'react-native';
import OptionalButton from '../../components/OptionalButton';
import {routerNames} from '../../constants/routerNames';
import {routerStore} from '../../store/routerStore';
import {styles} from './styles';


const goToPostForm = () => {
  routerStore.pushToScene({
    name: routerNames.POST_FORM,
  });
};

const goToVacancyForm = () => {
  routerStore.pushToScene({
    name: routerNames.VACANCY_FORM,
  });
};
const AddFormScreen = () => {
  return (
    <View style={styles.wrapper}>
      <OptionalButton title='Добавить пост' onPress={goToPostForm}/>
      <OptionalButton title='Добавить вакансию' onPress={goToVacancyForm}/>
      <OptionalButton title='Добавить резюме' onPress={goToPostForm}/>
    </View>
  );
};

export default AddFormScreen;
