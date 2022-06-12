import {Text, TextInputProps} from '@react-native-material/core';
import React, {useState} from 'react';
import {FlatList, ListRenderItemInfo, TouchableOpacity, View} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';
import {theme} from '../../styles/theme';
import {InputField, InputFieldProps} from '../InputField';
import {styles} from './styles';

type Props = {
  wrapperStyle?: ViewStyle,
  options: string[];
}


const InputSelect = ({wrapperStyle, options, ...props}: Props & InputFieldProps & TextInputProps) => {
  const [needShowOptions, setNeedShowOptions] = useState(false);

  const onPressOption = (option: string) => {
    if (props.onChangeText) {
      props?.onChangeText(option);
    }
    setNeedShowOptions(false);
  };


  const renderOption = ({item}: ListRenderItemInfo<string> ) => {
    return <TouchableOpacity onPress={() => onPressOption(item)} style={styles.option}>
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>;
  };

  return (
    <View style={[styles.wrapper, wrapperStyle, {
      zIndex: needShowOptions ? 1: 0,
      elevation: needShowOptions ?200: 0,
    }]}>
      <InputField
        color={theme.main}
        {...props}
        onPressIn={() => setNeedShowOptions(true)}
        onBlur={() => setNeedShowOptions(false)}
      />
      {needShowOptions && !!options.length && <FlatList
        style={styles.optionsWrapper}
        data={options}
        renderItem={renderOption}
        keyExtractor={(option) => option}
      />}

    </View>
  );
};

export default InputSelect;
