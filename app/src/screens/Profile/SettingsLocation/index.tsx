import {Text} from '@react-native-material/core';
import {runInAction} from 'mobx';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Alert, Image, View} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';
import {Card} from '../../../components/Card';
import ToogleButton from '../../../components/ToogleButton';
import {applicationStore} from '../../../store/applicationStore';
import {userStore} from '../../../store/userStore';
import {setUserLocationRules} from '../../../utils/userLocationRools';
import {styles, toobleBtnStyles} from './styles';

type Props = {
  value: boolean;
  onPress: () => void;
  wrapperStyle?: ViewStyle,
  title:string;
  tint?: string;
}

const ellipseIcon = require('../images/ellipse.png');


const askLocationPermissionIfNeeded = async (): Promise<boolean> => {
  if (!applicationStore.canFetchLocation()) {
    const res = applicationStore.askPermissionForGeolocation();
    return res;
  }

  return true;
};


const ToogleButtonWithDescription = ({title, tint, ...props}:Props) => {
  return (
    <View style={toobleBtnStyles.wrapper}>
      <View style={toobleBtnStyles.content}>
        <Text style={toobleBtnStyles.title}>{title}</Text>
        {!! tint && <Text style={toobleBtnStyles.tint}>{tint}</Text>}
      </View>
      <ToogleButton {...props}/>
    </View>
  );
};

const SettingsLocation = () => {
  // const [accessLocation, setAccessLocation] = useState(applicationStore.canShowLocation);
  // const [allowPermanentDetection, setAllowPermanentDetection] = useState(applicationStore.canUpdateLocation);


  const handleAccessLocation = async () => {
    const canUseLocation = await askLocationPermissionIfNeeded();

    if (!canUseLocation) {
      return;
    }

    runInAction(() => {
      applicationStore.canShowLocation = !applicationStore.canShowLocation;
      applicationStore.canUpdateLocation = applicationStore.canUpdateLocation ? false: applicationStore.canUpdateLocation;
    });
    setUserLocationRules({
      canShowLocation: !applicationStore.canShowLocation,
      canUpdateLocation: applicationStore.canUpdateLocation,
    });

    if (applicationStore.canShowLocation == false) {
      userStore.update({
        cordX: '0',
        cordY: '0',
      });
      return;
    }

    applicationStore.fetchLocation();
  };

  const handleAccessUpdateLocation = async () => {
    const newUpdateValue = !applicationStore.canUpdateLocation;
    const canUseLocation = await askLocationPermissionIfNeeded();
    if (!canUseLocation) {
      return;
    }

    runInAction(() => {
      applicationStore.canShowLocation = newUpdateValue ? true : applicationStore.canShowLocation;
      applicationStore.canUpdateLocation = newUpdateValue;
    });
    setUserLocationRules({
      canShowLocation: applicationStore.canShowLocation,
      canUpdateLocation: applicationStore.canUpdateLocation,
    });
  };

  return (
    <>
      <Card style={styles.wrapper}>
        <Text style={styles.title}>Геолокация</Text>
        <ToogleButtonWithDescription
          title='Доступ к местоположению'
          value={applicationStore.canShowLocation}
          onPress={handleAccessLocation}
        />
        <ToogleButtonWithDescription
          title='Обновление'
          tint={'Продолжать обновлять геопозицию при перемещении'}
          value={applicationStore.canUpdateLocation}
          onPress={handleAccessUpdateLocation}
        />

      </Card>
      <Image source={ellipseIcon} style={styles.ellipseIcon}/>
    </>

  );
};

export default observer(SettingsLocation);
