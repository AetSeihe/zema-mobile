import {TextInput} from '@react-native-material/core';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from '../../../../components/Icon';
import {theme} from '../../../../styles/theme';
import {styles} from './styles';

type Props = {
    onSubmit: (comment: string) => void
}

export const CommentForm = ({onSubmit}: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    onSubmit(value);
    setValue('');
  };
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder='Написать комментарий'
        color={theme.main}
        value={value}
        onChangeText={setValue}
        onMouseEnter={handleSubmit}
        style={styles.input}
      />
      {!!value.length && <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
        <Icon name='compass' size={24}/>
      </TouchableOpacity>}
    </View>
  );
};
