import {Text} from '@react-native-material/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Animated, Image, NativeSyntheticEvent, TouchableOpacity, View} from 'react-native';
import YaMap, {CameraPosition, Marker} from 'react-native-yamap';
import {Avatar} from '../../components/Avatar';
import ButtonUserEvent from '../../components/ButtonUserEvent';
import {routerNames} from '../../constants/routerNames';
import {User} from '../../models/User';
import {applicationStore} from '../../store/applicationStore';
import {friendStore} from '../../store/friendStore';
import {routerStore} from '../../store/routerStore';
import {styles, userProfileStyles} from './styles';
import {useIsFocused} from '@react-navigation/native';

type Props = {
  user: User,
}

const MAP_ANIMATION_DURATION = 0.2;
const ZOOM_STEP = 1;

const mapToUserIcon = require('./images/user-point.png');
const mapPlusIcon = require('./images/plus.png');
const mapMinusIcon = require('./images/minus.png');
const userMarkerIcon = require('./images/user-marker.png');
const markerIcon = require('./images/marker.png');

const UserProfile = ({user}: Props) => {
  const routeToProfile = () => {
    routerStore.pushToScene({
      name: routerNames.PROFILE,
      options: {
        user,
      },
    });
  };
  return (
    <View style={userProfileStyles.wrapper}>
      <View style={userProfileStyles.content}>
        <Avatar image={user.mainPhoto?.image} style={userProfileStyles.image}/>
        <View>
          <TouchableOpacity onPress={routeToProfile}>
            <Text style={userProfileStyles.fullname}>{user.fullName}</Text>
          </TouchableOpacity>
          <Text style={userProfileStyles.gender}>{user.nameOfGender}.</Text>
          <Text style={userProfileStyles.education}>{user.nameOfEducation}</Text>
        </View>
      </View>
      <ButtonUserEvent currentUser={user}/>

    </View>
  );
};


const goBackRouter = () => {
  if (routerStore.navigator?.canGoBack()) {
    routerStore.navigator.goBack();
    return;
  }

  routerStore.pushToScene({
    name: routerNames.HOME,
  });
};

const goSettingsRouter = () => {
  routerStore.pushToScene({
    name: routerNames.SETTING_LOCATION,
  });
};


const UsersMapScreen = () => {
  const mapZoom = useRef(12);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const map = useRef<YaMap | null>(null);
  const currentUserAnimation = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  const init = async () => {
    if (applicationStore.canShowLocation) {
      applicationStore.fetchLocation();
      return;
    }
    Alert.alert('Нужен доступ к геолокации', 'Разрешите доступ в настройках', [{
      text: 'Отмена',
      onPress: goBackRouter,
      style: 'cancel',
    }, {
      text: 'Перейти',
      onPress: goSettingsRouter,
      style: 'destructive',
    }]);
  };

  useEffect(() => {
    if (isFocused) {
      init();
    }
  }, [isFocused]);

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
          startCordX: region.topLeft.lat,
          finishCordX: region.topLeft.lon,
          startCordY: region.bottomRight.lat,
          finishCordY: region.bottomRight.lon,
        },
      });
    });
  };

  const handlePressMarker = (user: User) => {
    setCurrentUser(user);
    showUserProfile();
  };

  const onPressUserToButton = async () => {
    await applicationStore.fetchLocation();
    map.current?.setCenter({
      lat: applicationStore.cordX || 0,
      lon: applicationStore.cordY|| 0,
      zoom: mapZoom.current,
    });
  };

  const onPressPlusUserZoom = () => {
    map.current?.getCameraPosition((options) => {
      map.current?.setZoom(options.zoom);
    });
  };

  const onPressMinusUserZoom = () => {
    map.current?.getCameraPosition((options) => {
      Alert.alert(`${JSON.stringify(options.point, null, 2)}`);
      // map.current?.setZoom(options.zoom );
    });
  };

  return (
    <>
      <YaMap
        userLocationIcon={userMarkerIcon}
        ref={(ref) => (map.current = ref)}
        rotateGesturesEnabled={false}
        initialRegion={{
          lat: applicationStore.cordX || 0,
          lon: applicationStore.cordY|| 0,
          zoom: mapZoom.current,
        }}
        onCameraPositionChange={hideUserProfile}
        onCameraPositionChangeEnd={handleMapMove}
        style={{flex: 1}}
      >
        {friendStore.usersNear.map((user) =>(
          <Marker
            key={user.id}
            point={{lon: user.cordY|| 0, lat: user.cordX || 0}}
            scale={0.5} source={markerIcon}
            onPress={() => handlePressMarker(user)}
          />
        ))}
      </YaMap>
      {applicationStore.canShowLocation && (
        <TouchableOpacity onPress={onPressUserToButton} style={[styles.mapIconWrapper, styles.mapToUserIconWrapper]}>
          <Image onMagicTap={onPressUserToButton} source={mapToUserIcon} style={[styles.mapIcon]}/>
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

