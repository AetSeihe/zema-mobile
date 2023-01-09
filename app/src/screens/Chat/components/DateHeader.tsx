import {Text} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../../../styles/theme';

type Props = {
    title: string;
}

const DateHeader = ({title}: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    padding: 7,
    marginVertical: 5,
    borderRadius: 30,
    backgroundColor: theme.gray,
  },


  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DateHeader;
