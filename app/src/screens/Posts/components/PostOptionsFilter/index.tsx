import {Button, Text, TextInput} from '@react-native-material/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import Dropdown from '../../../../components/Dropdown';
import {theme} from '../../../../styles/theme';
import {styles} from './styles';

const initialValues = {
  text: '',
  cityFrom: '',
  cityTo: '',
};


type Props = {
    onSubmit: (options: typeof initialValues) => Promise<void>,
    loading: boolean
}


export const PostOptionsFilter = ({onSubmit, loading}: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <Dropdown title='Фильтры постов'
      visible={visible}
      wrapperStyle={styles.wrapper}
      onPressClose={() => setVisible(!visible)}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({values, handleSubmit, handleChange}) => <>
          <TextInput
            style={styles.input}
            label='Поиск по постам'
            placeholder='Куда лучше эмигрировать'
            color={theme.main}
            value={values.text}
            onChangeText={handleChange('text')}
          />
          <View style={styles.citiesWrapper}>
            <TextInput
              style={[styles.input, styles.inputCity]}
              label='Город откуда' color={theme.main}
              placeholder='Санкт-Петербург'
              value={values.cityFrom}
              onChangeText={handleChange('cityFrom')}
            />
            <TextInput
              style={[styles.input, styles.inputCity]}
              label='Нынешний город' color={theme.main}
              placeholder='Сочи'
              value={values.cityTo}
              onChangeText={handleChange('cityTo')}
            />
          </View>
          <Text style={styles.sort}>Сортировать: <Text style={styles.sortSelected}>C начала новые</Text></Text>
          <Button
            title={'Найти'}
            titleStyle={styles.buttonText}
            disabled={loading}
            loading={loading}
            color={theme.main}
            onPress={handleSubmit}
          />
        </>}
      </Formik>
    </Dropdown>
  );
};
