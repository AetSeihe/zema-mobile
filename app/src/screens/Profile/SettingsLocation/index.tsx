import {Text} from '@react-native-material/core';
import {runInAction} from 'mobx';
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
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
  const [accessLocation, setAccessLocation] = useState(applicationStore.canShowLocation);
  const [allowPermanentDetection, setAllowPermanentDetection] = useState(applicationStore.canUpdateLocation);


  useEffect(() => {
    if (applicationStore.geoLocationStatus === 'unavailable') {
      applicationStore.askPermissionForGeolocation();
    }
  }, [accessLocation, allowPermanentDetection]);

  const handleAccessLocation =() => {
    setAccessLocation(!accessLocation);
    setAllowPermanentDetection(allowPermanentDetection ? false: allowPermanentDetection);

    setUserLocationRules({
      canShowLocation: !accessLocation,
      canUpdateLocation: allowPermanentDetection ? false: allowPermanentDetection,
    });
    if (!accessLocation == true) {
      if (applicationStore.geoLocationStatus === 'unavailable') {
        applicationStore.askPermissionForGeolocation();
      }
      applicationStore.fetchLocation();
      runInAction(() =>{
        applicationStore.canShowLocation = !accessLocation,
        applicationStore.canUpdateLocation = allowPermanentDetection ? false: allowPermanentDetection;
      });
    }

    if (!accessLocation == false) {
      userStore.update({
        cordX: '0',
        cordY: '0',
      });
    }
  };

  const handleAccessUpdateLocation = () => {
    setAllowPermanentDetection(!allowPermanentDetection);
    setAccessLocation(!allowPermanentDetection ?true: accessLocation);
    setUserLocationRules({
      canShowLocation: !allowPermanentDetection ? true : accessLocation,
      canUpdateLocation: !allowPermanentDetection,
    });
    runInAction(() =>{
      applicationStore.canShowLocation = !allowPermanentDetection ? true : accessLocation,
      applicationStore.canUpdateLocation = !allowPermanentDetection;
    });
  };

  return (
    <>
      <Card style={styles.wrapper}>
        <Text style={styles.title}>Геолокация</Text>
        <ToogleButtonWithDescription
          title='Доступ к местоположению'
          value={accessLocation}
          onPress={handleAccessLocation}
        />
        <ToogleButtonWithDescription
          title='Обновление'
          tint={'Продолжать обновлять геопозицию при перемещении'}
          value={allowPermanentDetection}
          onPress={handleAccessUpdateLocation}
        />

      </Card>
      <Image source={ellipseIcon} style={styles.ellipseIcon}/>
    </>

  );
};

export default SettingsLocation;
