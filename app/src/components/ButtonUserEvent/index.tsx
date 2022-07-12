import {Button} from '@react-native-material/core';
import {observer} from 'mobx-react';
import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {routerNames} from '../../constants/routerNames';
import {Friend} from '../../models/Friend';
import {User} from '../../models/User';
import {friendStore} from '../../store/friendStore';
import {routerStore} from '../../store/routerStore';
import {userStore} from '../../store/userStore';
import {theme} from '../../styles/theme';
import Icon from '../Icon';
import {styles} from './styles';

type Props = {
    user?: Friend,
    currentUser: User
}

const onPressSettings = () => {
  routerStore.pushToScene({
    name: routerNames.PROFILE_SETTING,
    options: {},
  });
};

const onPressChat = (user: User) => {
  console.log('USEEEEEEER в ЧАТК ебанноооом', JSON.stringify(user, null, 2));
  routerStore.pushToScene({
    name: routerNames.Chat_Item,
    options: {
      user: user,
    },
  });
};

const accessRequest = async (user: Friend) => {
  const success = await friendStore.acceptRequest(user.id);
  if (success) {
    Alert.alert('Теперь у вас есть новый друг');
  }
};

const deleteFriend = async (user: Friend) => {
  Alert.alert(`Удаление из друзей`, `Вы уверенны что хотите удалить пользователя ${user.user.fullName} из друзей?`, [
    {
      text: 'Отмена',
      style: 'default',
    },
    {
      text: 'Удалить',
      style: 'cancel',
      onPress: () => friendStore.deleteFriend(user.id),
    },
  ]);
};

const rejectRequest = async (user: Friend) => {
  await friendStore.rejectRequest(user.id);
};


const sendRequest = async (user: User) => {
  const success = await friendStore.sendRequests(user.id);
  if (success) {
    Alert.alert('Запрос в друзья отправлен!');
  }
};


const ButtonUserEvent = ({user, currentUser}: Props) => {
  if (currentUser.id === userStore.user?.id) {
    return (
      <>
        <Button title='Редактировать' color={theme.main} onPress={onPressSettings} titleStyle={styles.writeButtonText} />
      </>);
  }

  const friendIfExist = friendStore.friends.find((friend) => friend.user.id === currentUser.id);

  if (friendIfExist) {
    return (
      <View style={styles.wrapper}>
        <Button title='Написать' color={theme.main} onPress={() => onPressChat(friendIfExist.user)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper}/>
        <TouchableOpacity onPress={() => deleteFriend(friendIfExist)} style={styles.deleteButton}>
          <Icon name='user-minus' size={22} color='#fff'/>
        </TouchableOpacity>
      </View>);
  }

  const requstIfExist = friendStore.requests.find((friend) => friend.user.id === currentUser.id);

  if (requstIfExist) {
    return (
      <View style={styles.wrapper}>
        <Button title='Написать' color={theme.main} onPress={() => onPressChat(requstIfExist.user)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper}/>
        <TouchableOpacity onPress={() => accessRequest(requstIfExist)} style={styles.normalButton}>
          <Icon name='user-plus' size={22} color='#fff'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => rejectRequest(requstIfExist)} style={styles.deleteButton}>
          <Icon name='user-minus' size={22} color='#fff'/>
        </TouchableOpacity>

      </View>);
  }

  return (
    <View style={styles.wrapper}>
      <Button title='Написать' color={theme.main} onPress={() => onPressChat(currentUser)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper}/>
      <TouchableOpacity onPress={() => sendRequest(currentUser)} style={styles.normalButton}>
        <Icon name='user-plus' size={22} color='#fff'/>
      </TouchableOpacity>
    </View>
  );
};

export default observer(ButtonUserEvent);
