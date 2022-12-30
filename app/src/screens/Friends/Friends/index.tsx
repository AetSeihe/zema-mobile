import {Text} from '@react-native-material/core';
import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React from 'react';
import {FlatList, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {CatAlert} from '../../../components/CatAlert';
import {FriendNames, routerNames} from '../../../constants/routerNames';
import {Friend} from '../../../models/Friend';
import {User} from '../../../models/User';
import {friendStore} from '../../../store/friendStore';
import {routerStore} from '../../../store/routerStore';
import {FriendHeader} from '../components/FriendHeader';
import UserCard from '../components/UserCard';
import {styles} from '../FriendsSearch/styles';

type Props = {
  navigation: NavigationProp<any>,
}

const goToChatByUserId = (user: User) => {
  routerStore.pushToScene({
    name: routerNames.Chat_Item,
    options: {
      userId: user.id,
    },
  });
};


const Friends = ({navigation}: Props) => {
  const onPressSearch = () => {
    navigation.navigate(FriendNames.FriendsSearch);
  };
  const onPressFriends = () => {
  };
  const onPressRequests = () => {
    navigation.navigate(FriendNames.FriendsRequest);
  };


  const renderLeftComponent = (user: User) => {
    return (
      <TouchableOpacity onPress={() => goToChatByUserId(user)} style={styles.leftAcctionWrapper}>
        <Text style={styles.leftAcctionText}>Написать</Text>
      </TouchableOpacity>
    );
  };

  const renderRightComponent = (user: Friend) => {
    return (
      <TouchableOpacity onPress={() => friendStore.deleteFriend(user.id)} style={[styles.leftAcctionWrapper, styles.leftActionBlock]}>
        <Text style={styles.leftAcctionText}>Удалить</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FriendHeader
        tabActive={'second'}
        onPressFriends={onPressFriends}
        onPressRequests={onPressRequests}
        onPressSearch={onPressSearch}
      />
      <FlatList
        ListEmptyComponent={<CatAlert title='Похоже у вас еще нет друзей, но мы скоро это исправим!'/>}
        style={styles.cardWrapper}
        data={friendStore.friends}
        renderItem={({item}) => (
          <Animated.View key={item.id} entering={FadeIn} exiting={FadeOut} style={styles.card}>
            <UserCard
              photo={item.user.mainPhoto?.image}
              title={item.user.fullName}
              gender={item.user.nameOfGender}
              education={item.user.education}
              dateOfBirth={item.user.currentBirthDay}
              age={item.user.age}
              onPressCard={() => renderLeftComponent(item.user)}
              renderLeftComponent={() => renderLeftComponent(item.user)}
              renderRightComponent={() => renderRightComponent(item)}
            />
          </Animated.View>)}
      />
    </View>
  );
};

export default observer(Friends);
