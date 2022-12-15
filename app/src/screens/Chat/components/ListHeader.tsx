import React from 'react';
import {StyleSheet, Text} from 'react-native';


type Props = {
    text: string;
}
const ListHeader = ({text}: Props) => {
  return (
    <Text style={styles.text}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: '#e6e6e6',
  },
});

export default ListHeader;
