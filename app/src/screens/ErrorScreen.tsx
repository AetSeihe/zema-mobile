import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ErrorScreenOptionsType} from '../types/routerTypes';

type Props = {
  route: {
    params: ErrorScreenOptionsType
  }
}

export const ErrorScreen = ({route}: Props) => {
  const params = route.params;
  return (
    <SafeAreaView>
      <Text>{params.title}</Text>
      <Text>{params.description}</Text>
      <Button title={params.buttonText}/>
    </SafeAreaView>
  );
};

