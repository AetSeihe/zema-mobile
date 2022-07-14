import React from 'react';
import {Image, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LogoImage} from '../../../assets/images';
import {styles} from './styles';

const el1Image = require('./images/ellipse1.png');
const el2Image = require('./images/ellipse2.png');


const AuthHeader = () => {
  return (
    <View style={styles.wrapper}>
      <SafeAreaView edges={['top']} style={styles.logoWrapper}>
        <Image source={LogoImage} style={styles.logo}/>
      </SafeAreaView>
      <Image source={el1Image} style={styles.circle1}/>
      <Image source={el2Image} style={styles.circle2}/>
    </View>
  );
};

export default AuthHeader;
