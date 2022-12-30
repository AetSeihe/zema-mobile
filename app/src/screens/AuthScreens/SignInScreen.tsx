import {Text} from '@react-native-material/core';
import {Formik} from 'formik';
import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {locale} from '../../locale';
import {theme} from '../../styles/theme';
import {styles} from './styles';
import * as yup from 'yup';
import {userStore} from '../../store/userStore';
import {routerStore} from '../../store/routerStore';
import {routerNames} from '../../constants/routerNames';
import {observer} from 'mobx-react-lite';
import {InputField} from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import AuthHeader from '../../navigation/components/AuthHeader';


const authLocale = locale.auth;
const signInLocale = locale.auth.signIn;

const initalValues = {
  login: '',
  password: '',
};
const schema = yup.object({
  login: yup.string().required(locale.fields.required),
  password: yup.string().required(locale.fields.required),
});

const SignInScreen = () => {
  const onSubmit = async (values: typeof initalValues) => {
    const error = await userStore.signIn(values);
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
    <View style={styles.wrapper}>
      <AuthHeader />
      <Text style={styles.title}>{signInLocale.title}</Text>
      <View style={styles.content}>
        <Formik
          initialValues={initalValues}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          {({handleChange, handleSubmit, values, errors}) => (
            <>
              <InputField
                wrapperStyle={styles.inputWrapper}
                label={authLocale.login}
                onChangeText={handleChange('login')}
                value={values.login}
                error={errors.login}
              />
              <InputField
                wrapperStyle={styles.inputWrapper}
                label={authLocale.password}
                onChangeText={handleChange('password')}
                value={values.password}
                error={errors.password}
                secureTextEntry={true}
              />
              <CustomButton
                theme='main'
                loading={userStore.loading}
                disabled={userStore.loading}
                style={styles.submitButton}
                titleStyle={styles.submitText}
                title={signInLocale.buttonText}
                color={theme.main}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>

        <Text style={styles.registerItem}>{signInLocale.registerTitle}</Text>
        <TouchableOpacity onPress={() => routerStore.pushToScene({
          name: routerNames.SIGN_UP,
        })}>
          <Text style={[styles.registerItem, styles.registerLink]}>{signInLocale.registerText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default observer(SignInScreen);

