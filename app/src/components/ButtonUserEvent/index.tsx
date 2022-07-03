import {Button} from '@react-native-material/core';
import {observer} from 'mobx-react';
import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {routerNames} from '../../constants/routerNames';
import {Friend} from '../../models/Friend';
import {User} from '../../models/User';
import {chatStore} from '../../store/chatStore';
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
  routerStore.tabBarNavigatorGoTo({
    name: routerNames.Chat,
    options: {
      user: user,
      chat: chatStore.chats.find((chat) => {
        return chat.companion.id === user.id;
      }),
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
  Alert.alert(`Удаление из друзей`, `ы уверенны что хотите удалить пользователя ${user.id} ${user.user.fullName} из друзей?`, [
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
  if (!user) {
    return (
      <View style={styles.wrapper}>
        <Button title='Написать' color={theme.main} onPress={() => onPressChat(currentUser)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper}/>
        <TouchableOpacity onPress={() => sendRequest(currentUser)} style={styles.normalButton}>
          <Icon name='user-plus' size={22} color='#fff'/>
        </TouchableOpacity>
      </View>
    );
  }
  if (friendStore.friends.some((friend) => friend.user.id === currentUser.id)) {
    return (
      <View style={styles.wrapper}>
        <Button title='Написать' color={theme.main} onPress={() => onPressChat(user.user)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper}/>
        <TouchableOpacity onPress={() => deleteFriend(user)} style={styles.deleteButton}>
          <Icon name='user-minus' size={22} color='#fff'/>
        </TouchableOpacity>
      </View>);
  }
  if (friendStore.requests.some((friend) => friend.user.id === currentUser.id)) {
    return (
      <View style={styles.wrapper}>
        <Button title='Написать' color={theme.main} onPress={() => onPressChat(user.user)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper}/>
        <TouchableOpacity onPress={() => accessRequest(user)} style={styles.normalButton}>
          <Icon name='user-plus' size={22} color='#fff'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => rejectRequest(user)} style={styles.deleteButton}>
          <Icon name='user-minus' size={22} color='#fff'/>
        </TouchableOpacity>

      </View>);
  }

  return (
    <View style={styles.wrapper}>
      <Button title='Написать' color={theme.main} onPress={() => onPressChat(user.user)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper}/>
      <TouchableOpacity onPress={() => sendRequest(currentUser)} style={styles.normalButton}>
        <Icon name='user-plus' size={22} color='#fff'/>
      </TouchableOpacity>
    </View>
  );
};

export default observer(ButtonUserEvent);
