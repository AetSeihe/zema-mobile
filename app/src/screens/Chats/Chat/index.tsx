import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {Title} from '../../../components/Title';
import {ChatEnum} from '../../../constants/routerNames';
import {User} from '../../../models/User';

type Props = {
  user?: User
}


export const Chat = ({user}: Props) => {
  return (
    <View>
      <Title>Чат с пользователем {user?.fullName}</Title>
    </View>
  );
};
