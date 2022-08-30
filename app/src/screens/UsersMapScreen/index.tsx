import {Text} from '@react-native-material/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, NativeSyntheticEvent, TouchableOpacity, View} from 'react-native';
import YaMap, {CameraPosition, Marker} from 'react-native-yamap';
import {Avatar} from '../../components/Avatar';
import ButtonUserEvent from '../../components/ButtonUserEvent';
import {User} from '../../models/User';
import {applicationStore} from '../../store/applicationStore';
import {friendStore} from '../../store/friendStore';
import {userStore} from '../../store/userStore';
import {styles, userProfileStyles} from './styles';

type Props = {
  user: User,
}


const mapToUserIcon = require('./images/user-point.png');
const mapPlusIcon = require('./images/plus.png');
const mapMinusIcon = require('./images/minus.png');


const UserProfile = ({user}: Props) => {
  return (
    <View style={userProfileStyles.wrapper}>
      <View style={userProfileStyles.content}>
        <Avatar image={user.mainPhoto?.image} style={userProfileStyles.image}/>
        <View>
          <Text style={userProfileStyles.fullname}>{user.fullName}</Text>
          <Text style={userProfileStyles.gender}>{user.nameOfGender}.</Text>
          <Text style={userProfileStyles.education}>{user.nameOfEducation}</Text>
        </View>
      </View>
      <ButtonUserEvent currentUser={user}/>

    </View>
  );
};

const markerIcon = require('./images/marker.png');


const UsersMapScreen = () => {
  const [loading, setLoading] = useState(true);
  // const [mapZoom, setMapZoom] = useState(12);
  const mapZoom = useRef(12);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const map = useRef<YaMap>(null);
  const currentUserAnimation = useRef(new Animated.Value(0)).current;

  const init = async () => {
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  const showUserProfile = () => {
    Animated.timing(
        currentUserAnimation,
        {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        },
    ).start();
  };

  const hideUserProfile = () => {
    if (!currentUser) {
      return;
    }
    Animated.timing(
        currentUserAnimation,
        {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        },
    ).start(({finished}) => {
      setCurrentUser(null);
    });
  };

  const handleMapMove = (data: NativeSyntheticEvent<CameraPosition>) => {
    map.current?.getVisibleRegion(async (region) => {
      await friendStore.fetchUsersNear({
        options: {
          limit: 30,
        },
        data: {
          startCordX: region.topRight.lon,
          finishCordX: region.topRight.lat,
          startCordY: region.bottomLeft.lon,
          finishCordY: region.bottomLeft.lat,
        },
      });
    });
  };

  const handlePressMarker = (user: User) => {
    setCurrentUser(user);
    showUserProfile();
  };

  const onPressUserToButton = () => {
    map.current?.setCenter({
      lat: userStore.user?.cordX || 0,
      lon: userStore.user?.cordY|| 0,
      zoom: mapZoom.current,
    });
  };

  const onPressPlusUserZoom = () => {
    mapZoom.current += 0.5;
    map.current?.setZoom(mapZoom.current);
  };

  const onPressMinusUserZoom = () => {
    mapZoom.current -= 0.5;
    map.current?.setZoom(mapZoom.current);
  };


  if (loading) {
    return <Text>Loading....</Text>;
  }
  return (
    <>
      <YaMap
        ref={(ref) => map.current = ref}
        showUserPosition={false}
        rotateGesturesEnabled={false}
        initialRegion={{
          lat: userStore.user?.cordX || 0,
          lon: userStore.user?.cordY|| 0,
          zoom: mapZoom.current,
        }}
        onCameraPositionChange={hideUserProfile}
        onCameraPositionChangeEnd={handleMapMove}
        style={{flex: 1}}
      >
        {friendStore.usersNear.map((user) =>(
          <Marker key={user.id} point={{lon: user.cordY|| 0, lat: user.cordX || 0}} scale={1} source={markerIcon} onPress={() => handlePressMarker(user)}/>
        ))}
      </YaMap>
      {applicationStore.canShowLocation && (
        <TouchableOpacity onPress={onPressUserToButton} style={[styles.mapIconWrapper, styles.mapToUserIconWrapper]}>
          <Image source={mapToUserIcon} style={[styles.mapIcon]}/>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onPressMinusUserZoom} style={[styles.mapIconWrapper, styles.mapPlusIconWrapper]}>
        <Image source={mapMinusIcon} style={[styles.mapIcon]} resizeMode='contain' />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressPlusUserZoom} style={[styles.mapIconWrapper, styles.mapMinusIconWrapper]}>
        <Image source={mapPlusIcon} style={[styles.mapIcon]}/>
      </TouchableOpacity>
      {currentUser && <Animated.View style={{
        position: 'absolute',
        opacity: currentUserAnimation,
        bottom: 0,
        width: '100%',
      }}>
        <UserProfile user={currentUser}/>
      </Animated.View>}
    </>
  );
};

export default observer(UsersMapScreen);

