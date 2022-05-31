import {Button, Text, TextInput} from '@react-native-material/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Alert, Image, Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LogoImage} from '../../assets/images';
import {locale} from '../../locale';
import {theme} from '../../styles/theme';
import {styles} from './styles';
import * as yup from 'yup';
import {userStore} from '../../store/userStore';
import {routerStore} from '../../store/routerStore';
import {routerNames} from '../../constants/routerNames';
import {observer} from 'mobx-react-lite';
import CheckBox from '@react-native-community/checkbox';

const authLocale = locale.auth;
const signUpLocale = locale.auth.signUp;

const initalValues = {
  name: 'Илья',
  phone: '+79080421577',
  email: 'quasar02@icloud.com',
  password: 'qwerty',
  confirmPassword: 'qwerty',

};
const schema = yup.object({
  name: yup.string().required('Это обязатаельное поле'),
  phone: yup.string().required('Это обязатаельное поле'),
  email: yup.string().email('Введите валидный email').required('Это обязатаельное поле'),
  password: yup.string().min(5, 'Пароль должен содержать минимум 5 символов').required('Это обязатаельное поле'),
  confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать').required('Это обязатаельное поле'),
});

const isErrorField = (error: any, param1: string, param2: string) => {
  return error ? param2 :param1;
};

const goToUserAgreement = () => {
  Linking.openURL('https://www.youtube.com/watch?v=8AHCfZTRGiI&list=RD8AHCfZTRGiI&start_radio=1');
};

const SignUpScreen = () => {
  const [consent, setConsent] = useState(false);


  const onSubmit = async (values: typeof initalValues) => {
    const resError = await userStore.signUp(values);
    if (resError) {
      Alert.alert(resError);
      return;
    }
    routerStore.pushToScene({
      name: routerNames.HOME,
    });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <Image source={LogoImage} style={styles.logo}/>
          <Text style={styles.title}>{signUpLocale.title}</Text>
          <Formik
            initialValues={initalValues}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {({handleChange, handleSubmit, values, errors}) => (
              <>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    label={authLocale.name}
                    color={isErrorField(errors.name, theme.main, theme.error)}
                    onChangeText={handleChange('name')}
                    value={values.name}
                  />
                  {errors.name && <Text color={theme.error}>{errors.name}</Text>}
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    label={authLocale.phone}
                    color={isErrorField(errors.phone, theme.main, theme.error)}
                    onChangeText={handleChange('phone')}
                    value={values.phone}
                  />
                  {errors.phone && <Text color={theme.error}>{errors.phone}</Text>}
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    label={authLocale.email}
                    color={isErrorField(errors.email, theme.main, theme.error)}
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  {errors.email && <Text color={theme.error}>{errors.email}</Text>}
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    label={authLocale.password}
                    color={isErrorField(errors.password, theme.main, theme.error)}
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                  {errors.password && <Text color={theme.error}>{errors.password}</Text>}
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    label={authLocale.confirmPassword}
                    color={isErrorField(errors.confirmPassword, theme.main, theme.error)}
                    onChangeText={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && <Text color={theme.error}>{errors.confirmPassword}</Text>}
                </View>
                <TouchableOpacity style={styles.userAgreementWrapper} onPress={() => setConsent(!consent)}>
                  <CheckBox
                    value={consent}
                    style={styles.userAgreementCheckbox}
                    onValueChange={setConsent}
                    animationDuration={0.2}
                  />
                  <Text style={styles.userAgreementText}>Даю согласие на обработку{' '}
                    <Text style={[styles.registerLink, styles.userAgreementText]} onPress={goToUserAgreement}>персональных данных</Text>
                  </Text>
                </TouchableOpacity>
                <Button
                  disabled={!consent}
                  loading={userStore.loading}
                  style={styles.submitButton}
                  titleStyle={styles.submitText}
                  title={signUpLocale.buttonText} color={theme.main}
                  onPress={handleSubmit}
                />
              </>
            )}

          </Formik>


          <Text style={styles.registerItem}>{signUpLocale.signInTitle}</Text>
          <TouchableOpacity onPress={() => routerStore.pushToScene({
            name: routerNames.SIGN_IN,
          })}>
            <Text style={[styles.registerItem, styles.registerLink]}>{signUpLocale.signInText}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default observer(SignUpScreen);

