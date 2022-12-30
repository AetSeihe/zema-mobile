import {Text} from '@react-native-material/core';
import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, Image, ScrollView, TouchableOpacity} from 'react-native';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';
import {CatAlert} from '../../../components/CatAlert';
import {Tint} from '../../../components/Tint';
import {FriendNames, routerNames} from '../../../constants/routerNames';
import {EDUCATION_LITERAL, User} from '../../../models/User';
import {cityServices} from '../../../services/cityServices';
import {userService} from '../../../services/userService';
import {friendStore} from '../../../store/friendStore';
import {routerStore} from '../../../store/routerStore';
import {CityType} from '../../../types/userTypes';
import {FriendHeader} from '../components/FriendHeader';
import {FriendsSearchForm} from '../components/FriendsSearchForm';
import UserCard from '../components/UserCard';
import {initialValueUsersSearch} from '../constants';
import {styles} from './styles';


const earthIcon = require('../images/earth.png');

type Props = {
  navigation: NavigationProp<any>,
}

const LIMIT_TO_SEARCH_FRIEND = 15;

const FriendsSearch = ({navigation}: Props) => {
  const [options, setOptions] = useState<typeof initialValueUsersSearch>(initialValueUsersSearch);
  const offsetSearch = useRef<number>(0);
  const cityFromRef = useRef<CityType | null>(null);
  const cityToRef = useRef<CityType | null>(null);

  useEffect(() => {
    handleScrollFlatList();
  }, []);

  const onPressSearch = () => {
  };

  const onPressFriends = () => {
    navigation.navigate(FriendNames.Friends);
  };
  const onPressRequests = () => {
    navigation.navigate(FriendNames.FriendsRequest);
  };


  const onSubmit = async (values: typeof initialValueUsersSearch) => {
    const cityFrom = await cityServices.getCityByName(values.cityFrom);
    const cityTo = await cityServices.getCityByName(values.cityTo);


    try {
      const currentUsers = await userService.getAllUsersByOptions({
        name: values.name.toLowerCase(),
        minAge: +values.minAge,
        maxAge: +values.maxAge,
        gender: values.gender,
        education: Object.keys(EDUCATION_LITERAL).find((key) => EDUCATION_LITERAL[key] === values.education),
        limit: LIMIT_TO_SEARCH_FRIEND,
        offset: 0,
        birthCityId: cityFrom[0]?.id,
        currentCityId: cityTo[0]?.id,
      });
      setOptions(values);
      cityFromRef.current = cityFrom[0];
      cityToRef.current = cityTo[0];
      offsetSearch.current = 0;
      offsetSearch.current += LIMIT_TO_SEARCH_FRIEND;

      friendStore.setUsersInSearch(currentUsers);
    } catch (e: any) {
      Alert.alert('Упс... что-то пошло не так', e.message);
    }
  };

  const handleScrollFlatList = async () => {
    const newUsers = await userService.getAllUsersByOptions({
      name: options.name.toLowerCase(),
      minAge: +options.minAge,
      maxAge: +options.maxAge,
      gender: options.gender,
      education: Object.keys(EDUCATION_LITERAL).find((key) => EDUCATION_LITERAL[key] === options.education),
      birthCityId: cityFromRef.current?.id,
      currentCityId: cityToRef.current?.id,
      limit: LIMIT_TO_SEARCH_FRIEND,
      offset: offsetSearch.current,
    });


    offsetSearch.current += LIMIT_TO_SEARCH_FRIEND;
    friendStore.setUsersInSearch([...friendStore.usersInSearch, ...newUsers]);
  };


  const onPressCard = (user: User) => {
    routerStore.pushToScene({
      name: routerNames.PROFILE,
      options: {
        user: user,
      },
    });
  };

  const onPressToEarth = () => {
    routerStore.pushToScene({
      name: routerNames.USER_MAP,
    });
  };

  const goToChatByUserId = (user: User) => {
    routerStore.pushToScene({
      name: routerNames.Chat_Item,
      options: {
        userId: user.id,
      },
    });
  };

  const renderLeftComponent = (user: User) => {
    return (
      <TouchableOpacity onPress={() => goToChatByUserId(user)} style={styles.leftAcctionWrapper}>
        <Text style={styles.leftAcctionText}>Написать</Text>
      </TouchableOpacity>
    );
  };

  const renderRightComponent = (user: User) => {
    return (
      <TouchableOpacity onPress={() => friendStore.banUser(user)} style={[styles.leftAcctionWrapper, styles.leftActionBlock]}>
        <Text style={styles.leftAcctionText}>Заблокировать</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.wrapper}>
      <FriendHeader
        tabActive={'first'}
        onPressFriends={onPressFriends}
        onPressRequests={onPressRequests}
        onPressSearch={onPressSearch}
      />

      <FriendsSearchForm onSubmit={onSubmit}/>
      <TouchableOpacity onPress={onPressToEarth} style={styles.earthWrapper}>
        <Text style={styles.earthText}>Земляки вокруг</Text>
        <Image source={earthIcon} style={styles.earthIcon}/>
      </TouchableOpacity>
      <FlatList
        onEndReached={handleScrollFlatList}
        ListEmptyComponent={<CatAlert title='Похоже по вашему запросу ничего не найденно'/>}
        ListFooterComponent={<Tint style={styles.tint}>Вы просмотрели всю ленту!</Tint>}
        onEndReachedThreshold={0.2}
        data={friendStore.currentUsersInSearch}
        renderItem={({item}) => (
          <Animated.View key={item.id} entering={FadeIn} exiting={FadeOut} layout={Layout.springify()} style={styles.card}>
            <UserCard
              renderLeftComponent={() => renderLeftComponent(item)}
              renderRightComponent={() => renderRightComponent(item)}
              onPressCard={() => onPressCard(item)}
              photo={item.mainPhoto?.image}
              title={item.fullName}
              age={item.age}
              dateOfBirth={item.currentBirthDay}
              gender={item.nameOfGender}
              education={item.education}
            />
          </Animated.View>)}
      />

    </ScrollView>
  );
};

export default observer(FriendsSearch);
