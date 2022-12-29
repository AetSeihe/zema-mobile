import {observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {Layout, SlideInLeft, SlideInRight} from 'react-native-reanimated';
import ButtonUserEvent from '../components/ButtonUserEvent';
import {UserCard} from '../components/UserCard';
import {User} from '../models/User';
import {friendStore} from '../store/friendStore';


const noop = () => {};
const BlockUsersList = () => {
  const renderButtons = (user: User) => {
    return <ButtonUserEvent currentUser={user}/>;
  };

  return (
    <View style={styles.wrapper}>
      {friendStore.blockUsers.map((user) =>(
        <Animated.View
          key={user.id}
          entering={SlideInLeft}
          exiting={SlideInRight}
          layout={Layout.springify()}
          style={styles.card}
        >
          <UserCard friend={user} onPress={noop} renderButtons={renderButtons}/>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flex: 1,
  },
  card: {
    marginBottom: 10,
  },
});

export default observer(BlockUsersList);
