import { NavigationProp } from '@react-navigation/core';
import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { CatAlert } from '../../../components/CatAlert';
import { FriendNames, routerNames } from '../../../constants/routerNames';
import { Friend } from '../../../models/Friend';
import { User } from '../../../models/User';
import { friendStore } from '../../../store/friendStore';
import { routerStore } from '../../../store/routerStore';
import { FriendHeader } from '../components/FriendHeader';
import UserCard from '../components/UserCard';
import { styles } from '../FriendsSearch/styles';

type Props = {
  navigation: NavigationProp<any>,
}

const onPressCard = (user: User) => {
  routerStore.pushToScene({
    name: routerNames.PROFILE,
    options: {
      user: user,
    },
  });
};


const FriendsRequest = ({ navigation }: Props) => {
  const onPressSearch = () => {
    navigation.navigate(FriendNames.FriendsSearch);
  };
  const onPressFriends = () => {
    navigation.navigate(FriendNames.Friends);
  };
  const onPressRequests = () => {
  };


  const renderLeftComponent = (request: Friend) => {
    return (
      <TouchableOpacity onPress={() => friendStore.acceptRequest(request.id)} style={styles.leftAcctionWrapper}>
        <Text style={styles.leftAcctionText}>Принять</Text>
      </TouchableOpacity>
    );
  };

  const renderRightComponent = (user: Friend) => {
    return (
      <TouchableOpacity onPress={() => friendStore.rejectRequest(user.id)} style={[styles.leftAcctionWrapper, styles.leftActionBlock]}>
        <Text style={styles.leftAcctionText}>Отклонить</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.wrapper}>
      <FriendHeader
        tabActive={'third'}
        onPressFriends={onPressFriends}
        onPressRequests={onPressRequests}
        onPressSearch={onPressSearch}
      />
      <FlatList
        style={styles.cardWrapper}
        ListEmptyComponent={<CatAlert title='У вас еще нет запросов в друзья' />}
        data={friendStore.requests}
        renderItem={({ item }) => (
          <Animated.View key={item.id} entering={FadeIn} exiting={SlideInRight} style={styles.card}>
            <UserCard
              photo={item.user.mainPhoto?.image}
              title={item.user.fullName}
              gender={item.user.nameOfGender}
              education={item.user.education}
              dateOfBirth={item.user.currentBirthDay}
              age={item.user.age}
              onPressCard={() => onPressCard(item.user)}
              renderLeftComponent={() => renderLeftComponent(item)}
              renderRightComponent={() => renderRightComponent(item)}
            />
          </Animated.View>)}
      />
    </ScrollView>
  );
};

export default observer(FriendsRequest);
