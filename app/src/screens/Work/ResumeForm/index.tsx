import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import {InputField} from '../../../components/InputField';
import {Title} from '../../../components/Title';
import {styles} from './styles';
import * as yup from 'yup';
import {locale} from '../../../locale';
import {Formik} from 'formik';
import {workStore} from '../../../store/workStore';
import {routerStore} from '../../../store/routerStore';
import {routerNames} from '../../../constants/routerNames';
import {phoneRegExp} from '../../../constants/root';


const schema = yup.object({
  title: yup.string().required(locale.fields.required),
  salary: yup.number().typeError(locale.fields.invalidTypeNumber).required(locale.fields.required),
  workExperience: yup.number().typeError(locale.fields.invalidTypeNumber).required(locale.fields.required),
  description: yup.string().required(locale.fields.required),
  // city: yup.string().required(locale.fields.required),
  experience: yup.string().required(locale.fields.required),
  phone: yup.string().matches(phoneRegExp, locale.fields.invalidNumberPhone),
  email: yup.string().email(locale.fields.invalidEmail),

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
  const handleSubmit = async (data: typeof initialValue) => {
    setLoading(true);
    await workStore.createResume({
      title: data.title,
      salary: +data.salary,
      workExperience: +data.workExperience,
      description: data.description,
      experience: data.experience,
      cityId: 1,
      phone: data.phone,
      email: data.email,
    });

    Alert.alert('Вы успешно добавили новое резюме');


    routerStore.pushToScene({
      name: routerNames.HOME,
    });


    setLoading(false);
  };

  return (
    <ScrollView >
      <View style={styles.wrapper}>
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
              <InputField label='Опыт работы*' keyboardType='numeric' wrapperStyle={styles.field}
                value={values.workExperience}
                error={errors.workExperience}
                onChangeText={handleChange('workExperience')}
              />
              <InputField label='Описание*' keyboardType='numeric' multiline inputStyle={styles.inputMuilty} wrapperStyle={styles.field}
                value={values.description}
                error={errors.description}
                onChangeText={handleChange('description')}
              />
              <InputField label='Ваши навыки' wrapperStyle={styles.field} helperText='Перечислите навыки которые должны быть у кандидата'
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
      </View>
    </ScrollView>
  );
};

export default ResumeForm;
