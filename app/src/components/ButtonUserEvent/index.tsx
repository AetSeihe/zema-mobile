import {observer} from 'mobx-react';
import React from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {routerNames} from '../../constants/routerNames';
import {Friend} from '../../models/Friend';
import {User} from '../../models/User';
import {friendStore} from '../../store/friendStore';
import {routerStore} from '../../store/routerStore';
import {userStore} from '../../store/userStore';
import {theme} from '../../styles/theme';
import CustomButton from '../CustomButton';
import Icon from '../Icon';
import {styles} from './styles';


const blockIcon = require('./blockIcon.png');

type Props = {
    user?: Friend,
    currentUser: User
}

const onPressSettings = () => {
  routerStore.pushToScene({
    name: routerNames.SETTING,
    options: {},
  });
};

const onPressChat = (user: User) => {
  routerStore.pushToScene({
    name: routerNames.Chat_Item,
    options: {
      userId: user.id,
    },
  });
};

const accessRequest = async (user: Friend) => {
  const success = await friendStore.acceptRequest(user.id);
  if (success) {
    Alert.alert('Теперь у вас есть новый друг');
  }
};

const banUser = (user: User) => {
  Alert.alert(`Заблокировать пользователя`, `Вы уверены что хотите заблокировать пользователя ${user.fullName} ?`, [
    {
      text: 'Отмена',
      style: 'default',
    },
    {
      text: 'Да',
      style: 'cancel',
      onPress: () => friendStore.banUser(user),
    },
  ]);
};


const unbanUser = (user: User) => {
  Alert.alert(`Разблокировать пользователя`, `Вы уверенны что хотите разблокировать пользователя ${user.fullName}?`, [
    {
      text: 'Отмена',
      style: 'default',
    },
    {
      text: 'Да',
      style: 'cancel',
      onPress: () => friendStore.unBanUser(user),
    },
  ]);
};

const deleteFriend = async (user: Friend) => {
  Alert.alert(`Действие`, `Вы хотите заблокировать пользователя ${user.user.fullName} или удалить его из друзей ?`, [
    {
      text: 'Удалить',
      onPress: () => friendStore.deleteFriend(user.id),
    },
    {
      text: 'Заблокировать',
      onPress: () => banUser(user.user),
    },
    {
      text: 'Отмена',
      style: 'cancel',
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


const ButtonUserEvent = ({currentUser}: Props) => {
  if (currentUser.id === userStore.user?.id) {
    return (
      <>
        <CustomButton title='Редактировать' theme='main' color={theme.main} onPress={onPressSettings} titleStyle={styles.writeButtonText} adjustsFontSizeToFit={true}/>
      </>);
  }

  const userIsBlock = friendStore.blockUsers.find((user) => user.id === currentUser.id);

  if (userIsBlock) {
    return (
      <View style={styles.wrapper}>
        <CustomButton title='Разблокировать' color={theme.main} onPress={() => unbanUser(userIsBlock)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper} adjustsFontSizeToFit={true}/>
      </View>
    );
  }

  const friendIfExist = friendStore.friends.find((friend) => friend.user.id === currentUser.id);

  if (friendIfExist) {
    return (
      <View style={styles.wrapper}>
        <CustomButton title='Написать' color={theme.main} onPress={() => onPressChat(friendIfExist.user)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper} adjustsFontSizeToFit={true}/>
        <TouchableOpacity onPress={() => deleteFriend(friendIfExist)} style={styles.deleteButton}>
          <Image style={styles.iconBlocked} source={blockIcon}/>
        </TouchableOpacity>
      </View>);
  }

  const requstIfExist = friendStore.requests.find((friend) => friend.user.id === currentUser.id);

  if (requstIfExist) {
    return (
      <View style={styles.wrapper}>
        <CustomButton title='Написать' color={theme.main} onPress={() => onPressChat(requstIfExist.user)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper} adjustsFontSizeToFit={true}/>
        <TouchableOpacity onPress={() => accessRequest(requstIfExist)} style={styles.normalButton}>
          <Icon name='user-plus' size={22} color='#fff'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => rejectRequest(requstIfExist)} style={styles.deleteButton}>
          <Image style={styles.iconBlocked} source={blockIcon}/>
        </TouchableOpacity>

      </View>);
  }

  return (
    <View style={styles.wrapper}>
      <CustomButton title='Написать' color={theme.main} onPress={() => onPressChat(currentUser)} titleStyle={styles.writeButtonText} style={styles.writeButtonWrapper} adjustsFontSizeToFit={true}/>
      <TouchableOpacity onPress={() => sendRequest(currentUser)} style={styles.normalButton}>
        <Icon name='user-plus' size={22} color='#fff'/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => banUser(currentUser)} style={styles.deleteButton}>
        <Image style={styles.iconBlocked} source={blockIcon}/>
      </TouchableOpacity>
    </View>
  );
};

export default observer(ButtonUserEvent);
