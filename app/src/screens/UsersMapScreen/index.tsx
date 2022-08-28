import {Text} from '@react-native-material/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, NativeSyntheticEvent, View} from 'react-native';
import YaMap, {CameraPosition, Marker} from 'react-native-yamap';
import {Avatar} from '../../components/Avatar';
import ButtonUserEvent from '../../components/ButtonUserEvent';
import {User} from '../../models/User';
import {applicationStore} from '../../store/applicationStore';
import {friendStore} from '../../store/friendStore';
import {userProfileStyles} from './styles';

type Props = {
  user: User,
}
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const map = useRef<YaMap>(null);
  const currentUserAnimation = useRef(new Animated.Value(0)).current;

  const init = async () => {
    await applicationStore.fetchLocation();
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
    ).start(() => {
      return () => {
        setCurrentUser(null);
      };
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
          lat: applicationStore.cordX || 0,
          lon: applicationStore.cordY|| 0,
          zoom: 12,
        }}
        onCameraPositionChange={hideUserProfile}
        onCameraPositionChangeEnd={handleMapMove}
        style={{flex: 1}}
      >
        {friendStore.usersNear.map((user) =>(
          <Marker key={user.id} point={{lon: user.cordY|| 0, lat: user.cordX || 0}} scale={1} source={markerIcon} onPress={() => handlePressMarker(user)}/>
        ))}
      </YaMap>
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

