import {Text} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export type WorkTabBarType = 'vacancy' | 'resume'
type Props = {
    active: WorkTabBarType;
    onPressVacancy: () => void;
    onPressResume: () => void;
}

const TabBar = ({active, onPressVacancy, onPressResume}: Props) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={[styles.item, styles.vancancy, active === 'vacancy' ? styles.activeItem: styles.null]} onPress={onPressVacancy}>
        <Text style={[styles.itemText, active === 'vacancy' ? styles.activeItemText: styles.null]}>Вакансии</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.item, active === 'resume' ? styles.activeItem: styles.null]} onPress={onPressResume}>
        <Text style={[styles.itemText, active === 'resume' ? styles.activeItemText: styles.null]}>Резюме</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  null: {},
  wrapper: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    color: '#1E205A',
  },
  activeItem: {
    backgroundColor: '#087BFF',
  },
  activeItemText: {
    color: '#fff',
  },
  vancancy: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TabBar;
