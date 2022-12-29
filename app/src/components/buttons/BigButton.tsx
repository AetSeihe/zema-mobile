import {Text} from '@react-native-material/core';
import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ViewStyle} from 'react-native-material-ui';

type Props = {
    title: string;
    onPress: () => void;
    icon: ImageSourcePropType,
    style: ViewStyle,
}

const BigButton = ({title, onPress, icon, style}: Props) => {
  return (
    <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress}>
      <Text>{title}</Text>
      <Image style={styles.icon} resizeMode='contain' source={icon}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1E205A',
  },
  text: {
    color: '#1E205A',
    fontSize: 14,
  },
  icon: {
    width: 21,
    height: 21,
  },
});

export default BigButton;
