import {Button, Text, TextInput} from '@react-native-material/core';
import {Formik} from 'formik';
import React from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
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

const isErrorField = (error: any, param1: string, param2: string) => {
  return error ? param2 :param1;
};

const SignInScreen = () => {
  const onSubmit = async (values: typeof initalValues) => {
    const error = await userStore.signIn(values);
    if (error) {
      Alert.alert(error);
      return;
    }
    routerStore.pushToScene({
      name: routerNames.HOME,
    });
  };


  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.content}>
        <Image source={LogoImage} style={styles.logo}/>
        <Text style={styles.title}>{signInLocale.title}</Text>
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
                  label={authLocale.login}
                  color={isErrorField(errors.login, theme.main, theme.error)}
                  onChangeText={handleChange('login')}
                  value={values.login}
                />
                {errors.login && <Text color={theme.error}>{errors.login}</Text>}
              </View>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.input}
                  label={authLocale.password}
                  color={theme.main}
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
                {errors.password && <Text color={theme.error}>{errors.password}</Text>}

              </View>

              <Button
                loading={userStore.loading}
                disabled={userStore.loading}
                style={styles.submitButton}
                titleStyle={styles.submitText}
                title={signInLocale.buttonText} color={theme.main}
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
    </SafeAreaView>
  );
};

export default observer(SignInScreen);

