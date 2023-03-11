import {Text, TextInputProps} from '@react-native-material/core';
import React, {useState} from 'react';
import {FlatList, ListRenderItemInfo, TouchableOpacity, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {ViewStyle} from 'react-native-material-ui';
import {theme} from '../../styles/theme';
import {InputField, InputFieldProps} from '../InputField';
import {styles} from './styles';

type Props = {
  wrapperStyle?: ViewStyle,
  options: string[];
  onPressOption?: (name: string) => void
}


const InputSelect = ({wrapperStyle, options, onPressOption, onChangeText, ...props}: Props & InputFieldProps & TextInputProps) => {
  const [needShowOptions, setNeedShowOptions] = useState(false);

  const onPress = (option: string) => {
    if (onChangeText) {
      onChangeText(option);
      onPressOption && onPressOption(option);
    }
    setNeedShowOptions(false);
  };

  const onChange = (text: string) => {
    onChangeText && onChangeText(text);
    setNeedShowOptions(true);
  };


  const renderOption = (item: string ) => {
    return (
      <TouchableOpacity key={item} onPress={() => onPress(item)} style={styles.option}>
        <Text style={styles.optionText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.wrapper, wrapperStyle, {
      zIndex: needShowOptions ? 1: 0,
      elevation: needShowOptions ?200: 0,
    }]}>
      <InputField
        onChangeText={onChange}
        color={theme.main}
        {...props}
        onPressIn={() => setNeedShowOptions(true)}
        onBlur={() => setTimeout(() => setNeedShowOptions(false), 2000)}
      />
  {needShowOptions && (
    <ScrollView  style={styles.optionsWrapper}>
      {options.map(item => renderOption(item))}
    </ScrollView>
  )}
    </View>
  );
};

export default InputSelect;
