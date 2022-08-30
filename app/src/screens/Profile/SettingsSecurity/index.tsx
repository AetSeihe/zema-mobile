import {Text} from '@react-native-material/core';
import {Formik} from 'formik';
import {observer} from 'mobx-react';
import React from 'react';
import {Image, ScrollView} from 'react-native';
import {Card} from '../../../components/Card';
import CustomButton from '../../../components/CustomButton';
import {InputField} from '../../../components/InputField';
import {userStore} from '../../../store/userStore';
import {theme} from '../../../styles/theme';
import {styles} from './styles';
import * as yup from 'yup';
import {locale} from '../../../locale';
import {routerStore} from '../../../store/routerStore';
import {routerNames} from '../../../constants/routerNames';
import {phoneRegExp} from '../../../constants/root';


const ellipseIcon = require('../images/ellipse.png');

const validationForEmailSchema = yup.object({
  oldEmail: yup.string(),
  newEmail: yup.string().email(locale.fields.invalidEmail).required(locale.fields.required),
  confirmEmail: yup.string()
      .oneOf([yup.ref('newEmail'), null], 'Поле должно совпадать с полем email').required(locale.fields.required),
});

const validationForPasswordSchema = yup.object({
  oldPassword: yup.string().required(locale.fields.required),
  newPassword: yup.string().required(locale.fields.required),
  confirmPassword: yup.string()
      .oneOf([yup.ref('newPassword'), null], 'Поле должно совпадать с полем email').required(locale.fields.required),
});

const validationForPhoneSchema = yup.object({
  newPhone: yup.string().matches(phoneRegExp, locale.fields.invalidNumberPhone).required(locale.fields.required),
});

const initialValueForPassword = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};


const SettingsSecurity = () => {
  const initialValueForEmail = {
    oldEmail: userStore.user?.email || '',
    newEmail: '',
    confirmEmail: '',
  };

  const initialValueForPhone = {
    oldPhone: userStore.user?.phone || '',
    newPhone: '',
  };


  const handleSubmitEmail = (values: typeof initialValueForEmail) => {
    userStore.update({
      email: values.newEmail,
    });
    routerStore.pushToScene({
      name: routerNames.HOME,
    });
  };

  const handleSubmitPassword = (values: typeof initialValueForPassword) => {
    userStore.update({
      password: values.newPassword,
    });
    routerStore.pushToScene({
      name: routerNames.HOME,
    });
  };

  const handleSubmitPhone = (values: typeof initialValueForPhone) => {
    console.log(JSON.stringify(values, null, 2));
    userStore.update({
      phone: values.newPhone,
    });
    routerStore.pushToScene({
      name: routerNames.HOME,
    });
  };

  return (
    <ScrollView>
      <Card style={styles.wrapper}>
        <Text style={styles.title}>Настройки безопасности</Text>
        <Formik
          initialValues={initialValueForEmail}
          onSubmit={handleSubmitEmail}
          validationSchema={validationForEmailSchema}
        >
          {({values, handleChange, handleSubmit, errors}) => (
            <>
              <InputField
                wrapperStyle={styles.field}
                placeholder={'e-mail'}
                value={values.oldEmail}
                editable={false}
                selectTextOnFocus={false}
              />
              <InputField
                wrapperStyle={styles.field}
                placeholder={'Введите новый  e-mail'}
                value={values.newEmail}
                onChangeText={handleChange('newEmail')}
                error={errors.newEmail}
              />
              <InputField
                wrapperStyle={styles.field}
                placeholder={'Повторите новый  e-mail'}
                value={values.confirmEmail}
                onChangeText={handleChange('confirmEmail')}
                error={errors.confirmEmail}

              />
              <CustomButton
                title={'Сохранить'}
                color={theme.main}
                titleStyle={styles.btn}
                style={styles.btnWrapper}
                onPress={handleSubmit}
              />
            </>)}
        </Formik>
        <Formik
          initialValues={initialValueForPassword}
          validationSchema={validationForPasswordSchema}
          onSubmit={handleSubmitPassword}
        >
          {({values, errors, handleChange, handleSubmit}) =>(
            <>
              <InputField
                wrapperStyle={styles.field}
                placeholder={'Старый пароль'}
                value={values.oldPassword}
                onChangeText={handleChange('oldPassword')}
                error={errors.oldPassword}
              />
              <InputField
                wrapperStyle={styles.field}
                placeholder={'Новый пароль'}
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                error={errors.newPassword}
              />
              <InputField
                wrapperStyle={styles.field}
                placeholder={'Повторите новый пароль'}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                error={errors.confirmPassword}
              />
              <CustomButton onPress={handleSubmit} title={'Сохранить'} color={theme.main} titleStyle={styles.btn} style={styles.btnWrapper}/>
            </>
          )}
        </Formik>
        <Formik
          initialValues={initialValueForPhone}
          validationSchema={validationForPhoneSchema}
          onSubmit={handleSubmitPhone}
        >
          {({values, errors, handleChange, handleSubmit}) =>(
            <>
              <InputField
                wrapperStyle={styles.field}
                placeholder={'Введите старый номер телефона'}
                editable={false}
                selectTextOnFocus={false}
                value={values.oldPhone}
              />
              <InputField
                wrapperStyle={styles.field}
                placeholder={'Введите новый номер телефона'}
                value={values.newPhone}
                onChangeText={handleChange('newPhone')}
                error={errors.newPhone}
              />
              <CustomButton
                onPress={handleSubmit}
                title={'Сохранить'}
                color={theme.main}
                titleStyle={styles.btn}
                style={styles.btnWrapper}
              />

            </>
          )}
        </Formik>
      </Card>
      <Image source={ellipseIcon} style={styles.ellipseIcon}/>
    </ScrollView>
  );
};

export default observer(SettingsSecurity);
