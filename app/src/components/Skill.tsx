import {Text} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';

type Props = {
    title: string;
    style?: ViewStyle;
}

const Skill = ({title, style}: Props) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Text style={[styles.skill]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#d1d1d1',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 10,
  },
  skill: {
    fontSize: 12,
  },
});

export default Skill;
