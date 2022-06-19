import {Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';


type NameOfTabsType = 'first' | 'second' | 'third'

type Props = {
    onPressFriends: () => void,
    onPressRequests: () => void,
    onPressSearch: () => void,
    tabActive: NameOfTabsType
}

const getStylesToWrapper = (barName: NameOfTabsType, activeBarName: NameOfTabsType) => {
  if (activeBarName ===barName) {
    return [styles.itemWrapper, styles.activeItem];
  }
  return styles.itemWrapper;
};

const getStylesText = (barName: NameOfTabsType, activeBarName: NameOfTabsType) => {
  if (activeBarName ===barName) {
    return [styles.text, styles.activeText];
  }
  return styles.text;
};

export const FriendHeader = ({onPressFriends, onPressRequests, onPressSearch, tabActive}: Props) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onPressSearch} style={getStylesToWrapper('first', tabActive)}>
        <Text style={getStylesText('first', tabActive)}>Поиск</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressFriends} style={getStylesToWrapper('second', tabActive)}>
        <Text style={getStylesText('second', tabActive)}>Друзья</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressRequests} style={getStylesToWrapper('third', tabActive)}>
        <Text style={getStylesText('third', tabActive)}>Входящие</Text>
      </TouchableOpacity>
    </View>
  );
};
