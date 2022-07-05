import {NavigationProp} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import ButtonUserEvent from '../../../components/ButtonUserEvent';
import {CatAlert} from '../../../components/CatAlert';
import {Tint} from '../../../components/Tint';
import {UserCard} from '../../../components/UserCard';
import {FriendNames, routerNames} from '../../../constants/routerNames';
import {EDUCATION_LITERAL, User} from '../../../models/User';
import {cityServices} from '../../../services/cityServices';
import {userService} from '../../../services/userService';
import {routerStore} from '../../../store/routerStore';
import {CityType} from '../../../types/userTypes';
import {FriendHeader} from '../components/FriendHeader';
import {FriendsSearchForm} from '../components/FriendsSearchForm';
import {initialValueUsersSearch} from '../constants';
import {styles} from './styles';

type Props = {
  navigation: NavigationProp<any>,
}

const LIMIT_TO_SEARCH_FRIEND = 15;

const FriendsSearch = ({navigation}: Props) => {
  const [users, setUsers] = useState<User[]>([]);
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
      setUsers(currentUsers);
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

    setUsers((prev) => [...prev, ...newUsers]);
  };


  const renderButtons = (user: User) => {
    return <ButtonUserEvent currentUser={user}/>;
  };

  const onPressCard = (user: User) => {
    routerStore.pushToScene({
      name: routerNames.PROFILE,
      options: {
        user: user,
      },
    });
  };

  return (
    <View style={styles.wrapper}>
      <FriendHeader
        tabActive={'first'}
        onPressFriends={onPressFriends}
        onPressRequests={onPressRequests}
        onPressSearch={onPressSearch}
      />
      <FlatList
        ListHeaderComponent={<FriendsSearchForm onSubmit={onSubmit}/>}
        onEndReached={handleScrollFlatList}
        ListEmptyComponent={<CatAlert title='Похоже по вашему запросу ничего не найденно'/>}
        ListFooterComponent={<Tint style={styles.tint}>Вы просмотрели всю ленту!</Tint>}
        onEndReachedThreshold={0.2}
        style={styles.cardWrapper}
        data={users}
        renderItem={({item}) => (
          <View style={styles.card}>
            <UserCard friend={item} onPress={onPressCard} renderButtons={renderButtons}/>
          </View>)}
      />
    </View>
  );
};

export default FriendsSearch;
