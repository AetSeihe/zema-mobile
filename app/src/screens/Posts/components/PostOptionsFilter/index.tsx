import {Button, Text} from '@react-native-material/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import Dropdown from '../../../../components/Dropdown';
import {InputField} from '../../../../components/InputField';
import InputSelect from '../../../../components/InputSelect';
import {cityServices} from '../../../../services/cityServices';
import {theme} from '../../../../styles/theme';
import {CityType} from '../../../../types/userTypes';
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
  const [cities, setCities] = useState<CityType[]>([]);
  const [birthCity, setBirthCity] = useState<CityType | null>(null);
  const [currentCity, setCurrentCity] = useState<CityType | null>(null);
  ;


  const getCitiesByName = async (name: string) => {
    if (name.length < 2 ) {
      return;
    }

    const citiesData = await cityServices.getCityByName(name);
    setCities(citiesData);
  };

  const getCitiesName = (cityes: CityType[]) => {
    return cityes.map((city) => city.title);
  };


  const getCityByName = (name: string) => {
    const candidate = cities.find((city) => city.title.toLowerCase() === name.toLowerCase());
    return candidate;
  };

  const handleSubmit = (values: typeof initialValues) => {
    onSubmit({
      ...values,
      cityFrom: birthCity?.title || '',
      cityTo: currentCity?.title || '',
    });
  };


  return (
    <Dropdown title='Фильтры постов'
      visible={visible}
      wrapperStyle={styles.wrapper}
      onPressClose={() => setVisible(!visible)}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} style>
        {({values, handleSubmit, handleChange}) => <>
          <View style={styles.inputsWrapper}>
            <InputField
              wrapperStyle={styles.input}
              label='Поиск по постам'
              placeholder='Куда лучше эмигрировать'
              color={theme.main}
              value={values.text}
              onChangeText={handleChange('text')}
            />
            <View style={styles.citiesWrapper}>
              <InputSelect label='Регион откуда'
                options={getCitiesName(cities)}
                wrapperStyle={[styles.input, styles.inputCity]}
                value={values.cityFrom}
                onChangeText={(text) => {
                  getCitiesByName(text);
                  const candidate = getCityByName(text);
                  if (candidate) {
                    setBirthCity(candidate);
                  }
                  return handleChange('cityFrom')(text);
                }}
              />
              <InputSelect label='Нынешний регион'
                options={getCitiesName(cities)}
                wrapperStyle={[styles.input, styles.inputCity]}
                value={values.cityTo}
                onChangeText={(text) => {
                  getCitiesByName(text);
                  const candidate = getCityByName(text);
                  if (candidate) {
                    setCurrentCity(candidate);
                  }
                  return handleChange('cityTo')(text);
                }}
              />
            </View>
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
