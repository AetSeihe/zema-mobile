import {Text} from '@react-native-material/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, NativeSyntheticEvent, TouchableOpacity, View} from 'react-native';
import YaMap, {CameraPosition, Marker} from 'react-native-yamap';
import {Avatar} from '../../components/Avatar';
import ButtonUserEvent from '../../components/ButtonUserEvent';
import {routerNames} from '../../constants/routerNames';
import {User} from '../../models/User';
import {applicationStore} from '../../store/applicationStore';
import {friendStore} from '../../store/friendStore';
import {routerStore} from '../../store/routerStore';
import {styles, userProfileStyles} from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Animated, {SlideInDown, SlideInUp, SlideOutDown, SlideOutUp} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import ToogleButtonWithDescription from '../../components/ToogleButtonWithDescription';
import {userStore} from '../../store/userStore';

type Props = {
  user: User,
}

const MAP_ANIMATION_DURATION = 0.2;
const ZOOM_STEP = 1;
const INITIAL_ZOOM = 10;
const mapToUserIcon = require('./images/user-point.png');
const mapPlusIcon = require('./images/plus.png');
const mapMinusIcon = require('./images/minus.png');
const markerIcon = require('./images/marker.png');
const markerIconZema = require('./images/markerZema.png');
const goBack = require('./images/goBack.png');
const settingsIcon = require('./images/settings.png');


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
          <Text style={userProfileStyles.education}>{user.education}</Text>
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


const renderUsers = (user: User, handlePressMarker: (user: User) => void) => {
  if (!user.birthCity?.regionId) {
    return <Marker
      key={user.id}
      point={{lon: user.cordY|| 0, lat: user.cordX || 0}}
      source={markerIcon}
      onPress={() => handlePressMarker(user)}
    />;
  }
  if ( user.birthCity?.regionId === userStore.user?.birthCity?.regionId) {
    return <Marker
      key={user.id}
      point={{lon: user.cordY|| 0, lat: user.cordX || 0}}
      source={markerIconZema}
      onPress={() => handlePressMarker(user)}
    />;
  }


  return <Marker
    key={user.id}
    point={{lon: user.cordY|| 0, lat: user.cordX || 0}}
    source={markerIcon}
    onPress={() => handlePressMarker(user)}
  />;
};

const renderOnlyZemaUsers = (user: User, handlePressMarker: (user: User) => void) => {
  if (!user.birthCity?.regionId) {
    return null;
  }
  if ( user.birthCity?.regionId === userStore.user?.birthCity?.regionId) {
    return <Marker
      key={user.id}
      point={{lon: user.cordY|| 0, lat: user.cordX || 0}}
      source={markerIconZema}
      onPress={() => handlePressMarker(user)}
    />;
  }

  return null;
};


const UsersMapScreen = () => {
  const navigation = useNavigation();
  const [showOnlyZema, setShowOnlyZema] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const map = useRef<YaMap | null>(null);
  const isFocused = useIsFocused();

  const init = async () => {
    if (applicationStore.canShowLocation) {
      await applicationStore.fetchLocation();
      map.current?.setCenter(
          {
            lon: applicationStore.cordY || 0,
            lat: applicationStore.cordX || 0,
          },
          INITIAL_ZOOM,
          0,
          0,
          MAP_ANIMATION_DURATION,
      );
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
  }, [isFocused, map.current]);


  const handleMapMove = (data: NativeSyntheticEvent<CameraPosition>) => {
    map.current?.getVisibleRegion(async (region) => {
      await friendStore.fetchUsersNear({
        options: {
          limit: 500,
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
  };

  const onPressUserToButton = async () => {
    await applicationStore.fetchLocation();
    map.current?.setCenter(
        {
          lon: applicationStore.cordY|| 0,
          lat: applicationStore.cordX || 0,
        },
        INITIAL_ZOOM,
        0,
        0,
        MAP_ANIMATION_DURATION,
    );

    await applicationStore.fetchLocation();
  };

  const onPressPlusUserZoom = () => {
    map.current?.getCameraPosition((options) => {
      map.current?.setZoom(options.zoom - ZOOM_STEP, MAP_ANIMATION_DURATION);
    });
  };

  const onPressMinusUserZoom = () => {
    map.current?.getCameraPosition((options) => {
      map.current?.setZoom(options.zoom + ZOOM_STEP, MAP_ANIMATION_DURATION);
    });
  };


  const onPressGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    routerStore.pushToScene({
      name: routerNames.HOME,
    });
  };
  return (
    <>
      <SafeAreaView style={styles.tabBarWrapper} >
        <View style={styles.tabBarButtons}>
          <TouchableOpacity style={styles.goBackWrapper} onPress={onPressGoBack}>
            <Image source={goBack} style={styles.goBackImage} resizeMode='contain' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsIconWrapper} onPress={() => setShowSettings(!showSettings)}>
            <Image source={settingsIcon} style={styles.settingsIconImage} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        {showSettings && (
          <Animated.View
            entering={SlideInUp.springify()}
            exiting={SlideOutUp.springify()}
            style={styles.settings}
          >
            <ToogleButtonWithDescription
              value={showOnlyZema}
              onPress={() => setShowOnlyZema(!showOnlyZema)}
              title='Показывать только земляков'
              tint={userStore.user?.birthCity ? 'Расскажите откуда вы родом, чтобы увидеть ваших земляков': 'Показывать на карте только земляков'}
            />
          </Animated.View>
        )}
      </SafeAreaView>
      <YaMap
        showUserPosition={false}
        ref={(ref) => (map.current = ref)}
        rotateGesturesEnabled={false}
        onCameraPositionChange={() => setCurrentUser(null)}
        onCameraPositionChangeEnd={handleMapMove}
        style={{flex: 1}}
      >
        {friendStore.usersNear.map((user) =>(
          showOnlyZema ? renderOnlyZemaUsers(user, handlePressMarker) : renderUsers(user, handlePressMarker)
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
      {currentUser && <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <UserProfile user={currentUser}/>
      </Animated.View>}
    </>
  );
};

export default observer(UsersMapScreen);

