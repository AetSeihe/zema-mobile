import {Button} from '@react-native-material/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import {InputField} from '../../../../components/InputField';
import {theme} from '../../../../styles/theme';
import {GetAllVacancyDataType} from '../../../../types/workTypes';
import {styles} from './styles';
import * as yup from 'yup';
import InputSelect from '../../../../components/InputSelect';
import {cityServices} from '../../../../services/cityServices';
import {CityType} from '../../../../types/userTypes';
import Dropdown from '../../../../components/Dropdown';


const schema = yup.object({
  text: yup.string(),
  city: yup.string(),
  salaryMin: yup.number().typeError('Это поле должно быть числом'),
  salaryMax: yup.number().typeError('Это поле должно быть числом'),
  minWorkExpirency: yup.number().typeError('Это поле должно быть числом'),


});

type Props = {
    onSubmit: (data: GetAllVacancyDataType) => void,
    initialOptions: GetAllVacancyDataType,
    title: string
}

const initialValues = {
  text: '',
  salaryMin: '',
  salaryMax: '',
  minWorkExpirency: '',
  maxWorkExpirency: '',
  city: '',
};

const VacancyFilter = ({onSubmit, title}: Props) => {
  const [cityes, setCityes] = useState<CityType[]>([]);
  const [city, setCity] = useState<CityType | null>(null);
  const [visible, setVisible] = useState(false);


  const handleSubmit = (values: typeof initialValues) => {
    onSubmit({
      text: values.text,
      cityId: city?.id,
      salaryMin: +values.salaryMin,
      salaryMax: +values.salaryMax,
      minWorkExpirency: +values.minWorkExpirency,
    });
  };

  const handleChangeCity = async (name: string) => {
    if (name.length < 3) {
      return;
    };

    const cities = await cityServices.getCityByName(name);
    const city = cities[0];
    setCity(city);
    setCityes(cities);
  };

  return (
    <Dropdown title={title} onPressClose={() => setVisible(!visible)} visible={visible} wrapperStyle={styles.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({values, errors, handleChange, handleSubmit}) => (
          <>
            <InputField
              label='Описание вакансии'
              wrapperStyle={styles.field}
              onChangeText={handleChange('text')}
              value={values.text}
              error={errors.text}
            />
            <InputSelect
              options={cityes.map((city) => city.title)}
              label='Регион'
              wrapperStyle={styles.field}
              onChangeText={(text) => {
                handleChangeCity(text);
                handleChange('city')(text);
              }}
              onPressOption={handleChangeCity}
              value={values.city}
              error={errors.city}

            />
            <View style={[styles.field, styles.row]}>
              <InputField label='Зарплата от' wrapperStyle={styles.inputRow}
                onChangeText={handleChange('salaryMin')}
                value={values.salaryMin}
                error={errors.salaryMin}

              />
              <InputField label='Зарплата до' wrapperStyle={styles.inputRow}
                onChangeText={handleChange('salaryMax')}
                value={values.salaryMax}
                error={errors.salaryMax}

              />
            </View>
            <InputField label='Опыт раброты от' wrapperStyle={styles.field}
              onChangeText={handleChange('minWorkExpirency')}
              value={values.minWorkExpirency}
              error={errors.minWorkExpirency}

            />
            <Button title='Найти' color={theme.main} titleStyle={styles.submitTitle} onPress={handleSubmit}/>
          </>
        )}
      </Formik>
    </Dropdown>
  );
};

export default VacancyFilter;
