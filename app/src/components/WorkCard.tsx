import {Text} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
    title: string;
    text: string;
    salary: number;
    onPress: () => void;
}

const WorkCard = ({title, text, salary, onPress}:Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Text numberOfLines={2} style={styles.text}>{text}</Text>
        <Text style={styles.salary}>от {salary}р.</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    elevation: 2,
    paddingHorizontal: 17,
    paddingVertical: 14,
    borderRadius: 5,
  },
  title: {
    color: '#1E205A',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 30,
  },
  text: {
    width: 150,
  },
  salary: {
    color: '#1E205A',
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default WorkCard;
