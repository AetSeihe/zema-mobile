import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React from 'react';
import {FlatList, View} from 'react-native';
import ButtonUserEvent from '../../../components/ButtonUserEvent';
import {CatAlert} from '../../../components/CatAlert';
import {UserCard} from '../../../components/UserCard';
import {FriendNames, routerNames} from '../../../constants/routerNames';
import {Friend} from '../../../models/Friend';
import {friendStore} from '../../../store/friendStore';
import {routerStore} from '../../../store/routerStore';
import {FriendHeader} from '../components/FriendHeader';
import {styles} from '../FriendsSearch/styles';

type Props = {
  navigation: NavigationProp<any>,
}

const onPressCard = (user: Friend) => {
  routerStore.pushToScene({
    name: routerNames.PROFILE,
    options: {
      user: user.user,
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


  const renderButtons = (user: Friend) => {
    return <ButtonUserEvent user={user} currentUser={user.user}/>;
  };

  return (
    <View>
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
        renderItem={({item}) => <View style={styles.card}>
          <UserCard friend={item} onPress={onPressCard} renderButtons={renderButtons}/>
        </View>}
      />
    </View>
  );
};

export default observer(Friends);
