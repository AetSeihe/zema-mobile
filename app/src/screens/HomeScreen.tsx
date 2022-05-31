import React, {useState} from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {userApi} from '../api/userApi';

const HomeScreen = () => {
  const [data, setData] = useState('Нет данных');

  const fetchUser = async () => {
    try {
      const user = await userApi.getUserById(1);
      setData(JSON.stringify(user.data.user, null, 2));
    } catch (e) {}
  };

  return (
    <SafeAreaView>
      <Text>{data}</Text>
      <Button title='Запросить юзера по id 1' onPress={fetchUser}/>
    </SafeAreaView>
  );
};

export default HomeScreen;
