import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import {InputField} from '../../../components/InputField';
import {Title} from '../../../components/Title';
import {styles} from './styles';
import * as yup from 'yup';
import {locale} from '../../../locale';
import {Formik} from 'formik';
import {workStore} from '../../../store/workStore';
import {phoneRegExp} from '../../../constants/root';
import {CityType} from '../../../types/userTypes';
import {cityServices} from '../../../services/cityServices';
import InputSelect from '../../../components/InputSelect';


const schema = yup.object({
  title: yup.string().required(locale.fields.required),
  salary: yup.number().typeError(locale.fields.invalidTypeNumber).required(locale.fields.required),
  workExperience: yup.number().typeError(locale.fields.invalidTypeNumber).required(locale.fields.required),
  description: yup.string().required(locale.fields.required),
  city: yup.string().required(locale.fields.required),
  experience: yup.string().required(locale.fields.required),
  phone: yup.string().matches(phoneRegExp, locale.fields.invalidNumberPhone).required(locale.fields.required),
  email: yup.string().email(locale.fields.invalidEmail).required(locale.fields.required),

});


const initialValue = {
  title: '',
  salary: '',
  workExperience: '0',
  description: '',
  city: '',
  experience: '',
  phone: '',
  email: '',
};


const ResumeForm = () => {
  const [loading, setLoading] = useState(false);
  const [cityes, setCityes] = useState<CityType[]>([]);
  const [city, setCity] = useState<CityType | null>(null);

  const handleChangeCity = async (name: string) => {
    if (name.length < 3) {
      return;
    };

    const cities = await cityServices.getCityByName(name);
    const city = cities[0];
    setCity(city);
    setCityes(cities);
  };

  const handleSubmit = async (data: typeof initialValue) => {
    if (!city) {
      Alert.alert('Ошибка... не удалось найти регион');
      return;
    }

    setLoading(true);

    const isSuccess = await workStore.createResume({
      title: data.title,
      salary: +data.salary,
      workExperience: +data.workExperience,
      description: data.description,
      experience: data.experience,
      cityId: city.id,
      phone: data.phone,
      email: data.email,
    });

    if (isSuccess) {
      Alert.alert('Новое резюме успешно добавлено!');
    } else {
      Alert.alert('Упс... что-то пошло не так');
    }

    // routerStore.pushToScene({
    //   name: routerNames.HOME,
    // });
    setLoading(false);
  };

  return (
    <ScrollView >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
        style={styles.wrapper}>
        <Title style={styles.title}>Добавление резюме</Title>
        <Formik
          initialValues={initialValue}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({values, errors, handleChange, handleSubmit}) => (
            <>
              <InputField label='Заголовок*' wrapperStyle={styles.field}
                value={values.title}
                error={errors.title}
                onChangeText={handleChange('title')}
              />
              <InputField label='Зарплата*' keyboardType='numeric' wrapperStyle={styles.field} helperText='Зарплату нужно указывать в рублях'
                value={values.salary}
                error={errors.salary}
                onChangeText={handleChange('salary')}
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
              <InputField label='Опыт работы*' keyboardType='numeric' wrapperStyle={styles.field}
                value={values.workExperience}
                error={errors.workExperience}
                onChangeText={handleChange('workExperience')}
              />
              <InputField label='Описание*'
                multiline
                style={styles.inputMuilty}
                wrapperStyle={styles.field}
                value={values.description}
                error={errors.description}
                onChangeText={handleChange('description')}
              />
              <InputField
                multiline
                style={styles.inputMuilty}
                label='Ваши навыки'
                wrapperStyle={styles.field}
                helperText='Перечислите навыки которые должны быть у кандидата'
                value={values.experience}
                error={errors.experience}
                onChangeText={handleChange('experience')}
              />
              <InputField label='Номер телефона для связи' keyboardType='phone-pad' wrapperStyle={styles.field}
                value={values.phone}
                error={errors.phone}
                onChangeText={handleChange('phone')}
              />
              <InputField label='E-mail для связи' keyboardType='email-address' wrapperStyle={styles.field}
                value={values.email}
                error={errors.email}
                onChangeText={handleChange('email')}
              />
              <CustomButton
                title='Создать'
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
              />
            </>)}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ResumeForm;
