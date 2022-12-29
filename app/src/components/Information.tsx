import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {FadeIn, FadeInDown, FadeOut, FadeOutUp} from 'react-native-reanimated';
import {ellipseImage, womanImage} from '../assets/images';


type Props = {
    title: string;
    text: string;
}

const Information = ({title, text}: Props) => {
  return (
    <View style={styles.wrapper}>
      <Animated.Text entering={FadeInDown} exiting={FadeOutUp} style={styles.title}>{title}</Animated.Text >
      <Animated.Text entering={FadeInDown.delay(200)} exiting={FadeOutUp} style={styles.text}>{text}</Animated.Text>
      <Animated.Image entering={FadeIn} exiting={FadeOut} style={styles.elipse} resizeMode='contain' source={ellipseImage}/>
      <Animated.Image entering={FadeInDown.delay(200)} exiting={FadeOutUp} style={styles.image} resizeMode='contain' source={womanImage}/>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    color: '#1E205A',
    fontWeight: '600',
    fontSize: 25,
    marginBottom: 8,
    marginLeft: 22,
  },
  text: {
    marginLeft: 22,
    color: '#1E205A',
    fontSize: 13,
  },
  elipse: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    zIndex: -1,
    width: 585,
    height: 585,

  },
  image: {
    width: 316,
    height: 218,
    position: 'absolute',
    bottom: 78,
    right: 19,
    zIndex: -1,

  },
});

export default Information;
