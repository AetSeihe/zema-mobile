import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {FadeIn, FadeInDown, FadeOut, SlideInRight} from 'react-native-reanimated';
import {Skeleton, SkeletonContainer} from 'react-native-skeleton-component';
import {Avatar} from '../../../components/Avatar';
import ButtonUserEvent from '../../../components/ButtonUserEvent';
import {routerNames} from '../../../constants/routerNames';
import {Friend} from '../../../models/Friend';
import {User} from '../../../models/User';
import {friendService} from '../../../services/friendService';
import {userService} from '../../../services/userService';
import {routerStore} from '../../../store/routerStore';
import {userStore} from '../../../store/userStore';
import {ProfileScreenOptionsType} from '../../../types/routerTypes';
import {getPrefixToYears} from '../../../utils/getPrefixToYears';

type Props = {
  navigation: NavigationProp<any>,
  route: {
    params: ProfileScreenOptionsType
  }
}

const arrowIcon = require('./images/arrows.png');

const MoskFriendsList = () => {
  return (
    <SkeletonContainer>
      <Animated.View entering={FadeIn} exiting={FadeOut} style={friendItemStyles.wrapper}>
        <Skeleton style={friendItemStyles.avatar}/>
        <Skeleton style={friendItemStyles.titleMock}/>
      </Animated.View>
      <Animated.View entering={FadeIn} exiting={FadeOut} style={friendItemStyles.wrapper}>
        <Skeleton style={friendItemStyles.avatar}/>
        <Skeleton style={friendItemStyles.titleMock}/>
      </Animated.View>
      <Animated.View entering={FadeIn} exiting={FadeOut} style={friendItemStyles.wrapper}>
        <Skeleton style={friendItemStyles.avatar}/>
        <Skeleton style={friendItemStyles.titleMock}/>
      </Animated.View>
      <Animated.View entering={FadeIn} exiting={FadeOut} style={friendItemStyles.wrapper}>
        <Skeleton style={friendItemStyles.avatar}/>
        <Skeleton style={friendItemStyles.titleMock}/>
      </Animated.View>
      <Animated.View entering={FadeIn} exiting={FadeOut} style={friendItemStyles.wrapper}>
        <Skeleton style={friendItemStyles.avatar}/>
        <Skeleton style={friendItemStyles.titleMock}/>
      </Animated.View>
    </SkeletonContainer>)
  ;
};


const ProfileS = ({route}:Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>(route.params.user);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isBanned, setIsBanned] = useState(false);
  const [loadingFriend, setLoadingFriends] = useState<boolean>(true);


  const fetchFriends = async () => {
    const friends = await friendService.getAllFriends(user.id);
    setFriends(friends);
    setLoadingFriends(false);
  };

  const init = async () => {
    try {
      const canidate = await userService.getUserById(user.id);
      setUser(canidate);
      setLoading(false);
      fetchFriends();
    } catch (e) {
      setIsBanned(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const goToProfile = (friend: User) => {
    routerStore.pushToScene({
      name: routerNames.HOME,
      options: {},
    });

    routerStore.pushToScene({
      name: routerNames.PROFILE,
      options: {
        user: friend,
      },
    });
  };


  return (
    <ScrollView scrollEnabled={!loading} style={styles.wrapper}>
      <View style={[styles.header, styles.card]}>
        <View style={styles.row}>
          <Avatar image={user.mainPhoto?.image} style={styles.avatar}/>
          <View>
            <Text style={styles.fullName}>{user.fullName}</Text>
            <View style={styles.citiesWrapper}>
              {user.birthCity && <Text style={styles.city}>{user.birthCity?.title}</Text>}
              {user.currentCity && user.birthCity && <Image style={styles.cityIcon} source={arrowIcon} resizeMode='contain'/>}
              {user.currentCity && <Text style={styles.currentCity}>{user.currentCity?.title}</Text>}
            </View>
            {user.gender !== 'null' && <Text style={styles.text}>{user.nameOfGender}</Text>}
            {user.birthday?.getFullYear() !== new Date().getFullYear() &&(
              <Text style={styles.text}>{user.currentBirthDay} <Text style={styles.age}>({user.age} {getPrefixToYears(user.age)})</Text></Text>
            )}
            {user.education !== 'null' && <Text style={styles.text}>{user.education}</Text>}
          </View>
        </View>
        {user.id === userStore.user?.id && (
          <Text style={styles.compillerProfile}>Ваш профиль заполнен на:{' '}
            <Text style={styles.compillerProfileBold}>{user.profileCompletion}%</Text>
          </Text>)}
        {!isBanned && (
          <>
            <View>
              <Text style={styles.title}>Цепочка знакомых</Text>
              <ScrollView horizontal>
                {loadingFriend && <MoskFriendsList />}
                {friends.map((friend, i) => (
                  <Animated.View entering={SlideInRight.delay(i / 10)} key={friend.id} style={styles.wrapper}>
                    <TouchableOpacity onPress={() => goToProfile(friend.user)}>
                      <Avatar style={friendItemStyles.avatar} image={friend.user.mainPhoto?.image}/>
                      <Text style={friendItemStyles.title}>{friend.user.fullName}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </ScrollView>
            </View>
          </>)}
        {isBanned && (
          <View style={styles.banWrapper}>
            <Text style={styles.banText}>Вы или <Text style={styles.bold}>{user.fullName}</Text> заблокировали друг друга. <Text style={styles.bold}>Для того чтобы разблокировать пользователя зайдите в настройки {'->'} заблокированные пользователи</Text></Text>
          </View>
        )}
      </View>
      {!isBanned && <ButtonUserEvent currentUser={user}/>}
      {!loading && (
        <>
          {!!user.interesting && (
            <Animated.View entering={FadeInDown} style={styles.card}>
              <Text style={styles.title}>Обо мне</Text>
              <Text style={styles.text}>{user.interesting}</Text>
            </Animated.View>
          )}
          {!!user.needHelp && (
            <Animated.View entering={FadeInDown} style={styles.card}>
              <Text style={styles.title}>Нужна помощь</Text>
              <Text style={styles.text}>{user.needHelp}</Text>
            </Animated.View>
          )}
          {!!user.howCanHelp && (
            <Animated.View entering={FadeInDown} style={styles.card}>
              <Text style={styles.title}>Чем я могу помочь</Text>
              <Text style={styles.text}>{user.howCanHelp}</Text>
            </Animated.View>
          )}
        </>
      )}

    </ScrollView>
  );
};

const friendItemStyles = StyleSheet.create({
  wrapper: {
    marginRight: 15,
  },
  avatar: {
    alignSelf: 'center',
    width: 65,
    height: 65,
    marginBottom: 3,
  },
  title: {
    maxWidth: '100%',
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#1E205A',
  },
  titleMock: {
    width: '100%',
    height: 20,
  },
});


const styles = StyleSheet.create({
  banWrapper: {
    padding: 15,
    backgroundColor: '#d8e1e3',
    borderRadius: 10,
  },
  banText: {},
  bold: {
    fontWeight: '600',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  card: {
    marginVertical: 7,
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 134,
    height: 159,
    marginRight: 11,
  },
  fullName: {
    color: '#1E205A',
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 9,
  },
  citiesWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  city: {
    color: '#8F89A0',
    fontSize: 13,
    fontWeight: '500',
  },
  currentCity: {
    color: '#087BFF',
    fontSize: 13,
    fontWeight: '500',
  },
  cityIcon: {
    width: 13,
  },
  title: {
    fontSize: 20,
    color: '#1E205A',
    marginBottom: 7,
  },
  text: {
    marginBottom: 5,
    color: '#1E205A',
    fontSize: 14,
  },
  age: {
    color: '#646464',
    fontSize: 14,
  },
  compillerProfile: {
    color: '#087BFF',
    fontSize: 17,
    fontWeight: '600',
  },
  compillerProfileBold: {
    fontSize: 34,
  },
});

export const Profile = observer(ProfileS);
