import {Button, Text} from '@react-native-material/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {CheckBoxWithLabel} from '../../../../components/CheckBoxWithLabel';
import Icon from '../../../../components/Icon';
import {InputField} from '../../../../components/InputField';
import InputSelect from '../../../../components/InputSelect';
import {EDUCATION_LITERAL, GENDER_LITERAL} from '../../../../models/User';
import {theme} from '../../../../styles/theme';
import {initialValueUsersSearch} from '../../constants';
import {styles} from './styles';
import * as yup from 'yup';
import {CityType} from '../../../../types/userTypes';
import {cityServices} from '../../../../services/cityServices';
import Dropdown from '../../../../components/Dropdown';

const schema = yup.object({
  name: yup.string(),
  cityFrom: yup.string(),
  cityTo: yup.string(),
  minAge: yup.number().typeError('Это поле должно быть числом'),
  maxAge: yup.number().typeError('Это поле должно быть числом'),
});


type Props = {
  onSubmit: (values: typeof initialValueUsersSearch) => void;
}

export const FriendsSearchForm = ({onSubmit}: Props) => {
  const [isShown, setIsShown] = useState(false);
  const [cities, setCities] = useState<CityType[]>([]);
  const [birthCity, setBirthCity] = useState<CityType | null>(null);
  const [currentCity, setCurrentCity] = useState<CityType | null>(null);


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


  return (
    <Dropdown title='Фильтры' visible={isShown} onPressClose={() => setIsShown(!isShown)} wrapperStyle={styles.wrapper}>
      <ScrollView>
        <Formik
          initialValues={initialValueUsersSearch}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({values, errors, handleChange, resetForm, handleSubmit}) => <>
            <InputField
              label='ФИО'
              style={styles.field}
              value={values.name}
              onChangeText={handleChange('name')}
              error={errors.name}
            />
            <InputSelect label='Из какого города' options={getCitiesName(cities)} style={styles.field}
              value={values.cityFrom}
              onChangeText={(text) => {
                getCitiesByName(text);
                const candidate = getCityByName(text);
                if (candidate) {
                  setBirthCity(candidate);
                }
                return handleChange('cityFrom')(text);
              }}
              error={errors.cityFrom}
            />
            <InputSelect label='Город проживания' options={getCitiesName(cities)} style={styles.field}
              value={values.cityTo}
              error={errors.cityTo}
              onChangeText={(text) => {
                getCitiesByName(text);
                const candidate = getCityByName(text);
                if (candidate) {
                  setCurrentCity(candidate);
                }
                return handleChange('cityTo')(text);
              }}
            />
            <View style={[styles.row, styles.field]}>
              <InputField label='возраст от' keyboardType='numeric' wrapperStyle={styles.age}
                value={values.minAge}
                onChangeText={handleChange('minAge')}
                error={errors.minAge}
              />
              <InputField label='возраст до' keyboardType='numeric' wrapperStyle={styles.age}
                value={values.maxAge}
                onChangeText={handleChange('maxAge')}
                error={errors.maxAge}
              />
            </View>
            <View style={styles.field}>
              <CheckBoxWithLabel title={GENDER_LITERAL.null}
                value={values.gender === ''}
                onPress={() => handleChange('gender')('')}
              />
              <CheckBoxWithLabel title={GENDER_LITERAL.male}
                value={values.gender === 'male'}
                onPress={() => handleChange('gender')('male')}
              />
              <CheckBoxWithLabel title={GENDER_LITERAL.female}
                value={values.gender === 'female'}
                onPress={() => handleChange('gender')('female')}
              />
            </View>
            <InputSelect
              options={Object.values(EDUCATION_LITERAL)}
              label='Образование'
              value={values.education}
              onChangeText={handleChange('education')}
              wrapperStyle={styles.field}
            />
            <Button title='Найти' color={theme.main}
              style={styles.submitWrappers}
              titleStyle={styles.submit}
              onPress={() => {
                setIsShown(false);
                handleSubmit();
              }}
            />
            <TouchableOpacity style={styles.row} onPress={() => resetForm()}>
              <Icon name='bin' size={19} color={theme.main}/>
              <Text style={styles.reset}>Сбросить все</Text>
            </TouchableOpacity>
          </>}
        </Formik>
      </ScrollView>
    </Dropdown>
  );
};
