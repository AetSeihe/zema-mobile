import {Button, Text} from '@react-native-material/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Alert, Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import {locale} from '../../locale';
import {theme} from '../../styles/theme';
import {styles} from './styles';
import * as yup from 'yup';
import {userStore} from '../../store/userStore';
import {routerStore} from '../../store/routerStore';
import {routerNames} from '../../constants/routerNames';
import {observer} from 'mobx-react-lite';
import {InputField} from '../../components/InputField';
import {phoneRegExp} from '../../constants/root';
import Icon from '../../components/Icon';
import AuthHeader from '../../navigation/components/AuthHeader';

const authLocale = locale.auth;
const signUpLocale = locale.auth.signUp;

const initalValues = {
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',

};
const schema = yup.object({
  name: yup.string().required(locale.fields.required),
  phone: yup.string().matches(phoneRegExp, locale.fields.invalidNumberPhone).required(locale.fields.required),
  email: yup.string().email(locale.fields.invalidEmail).required(locale.fields.required),
  password: yup.string().min(5, locale.fields.invalidPassword).required(locale.fields.required),
  confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], locale.fields.confirmPassword).required(locale.fields.required),
});


const goToUserAgreement = () => {
  Linking.openURL('https://drive.google.com/file/d/1obzla8V_sUq9P2TxYVpEu2pMUXaUlkof/view?usp=sharing');
};

const SignUpScreen = () => {
  const [consent, setConsent] = useState(false);


  const onSubmit = async (values: typeof initalValues) => {
    const error = await userStore.signUp(values);
    if (error) {
      Alert.alert(error);
      return;
    }
    routerStore.pushToScene({
      name: routerNames.ASK_GEO_PERMISSION,
    });
  };

  // FIX RELOAD
  console.log(userStore.loading);

  return (
    <ScrollView style={styles.wrapper}>
      <AuthHeader />
      <View style={styles.content}>
        <Text style={styles.title}>{signUpLocale.title}</Text>
        <Formik
          initialValues={initalValues}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          {({handleChange, handleSubmit, values, errors}) => (
            <>
              <InputField
                wrapperStyle={styles.inputWrapper}
                label={authLocale.name}
                onChangeText={handleChange('name')}
                value={values.name}
                error={errors.name}
              />
              <InputField
                wrapperStyle={styles.inputWrapper}
                label={authLocale.phone}
                onChangeText={handleChange('phone')}
                value={values.phone}
                error={errors.phone}
                keyboardType='name-phone-pad'
              />
              <InputField
                wrapperStyle={styles.inputWrapper}
                label={authLocale.email}
                onChangeText={handleChange('email')}
                value={values.email}
                error={errors.email}
                keyboardType='email-address'
              />
              <InputField
                wrapperStyle={styles.inputWrapper}
                label={authLocale.password}
                onChangeText={handleChange('password')}
                value={values.password}
                error={errors.password}
                secureTextEntry={true}
              />
              <InputField
                wrapperStyle={styles.inputWrapper}
                label={authLocale.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword}
                error={errors.confirmPassword}
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.userAgreementWrapper} onPress={() => setConsent(!consent)}>
                <View style={styles.userAgreementCheckbox}>
                  <Icon name={consent ? 'checkbox-checked': 'checkbox-unchecked'} size={20} color={theme.main}/>
                </View>
                <Text style={styles.userAgreementText}>Даю согласие на обработку{' '}
                  <Text style={[styles.registerLink, styles.userAgreementText]} onPress={goToUserAgreement}>персональных данных</Text>
                </Text>
              </TouchableOpacity>
              <Button
                disabled={!consent || userStore.loading}
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
    </ScrollView>
  );
};

export default observer(SignUpScreen);

