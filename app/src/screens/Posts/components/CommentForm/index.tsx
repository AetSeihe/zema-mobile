import {Text, TextInput} from '@react-native-material/core';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar} from '../../../../components/Avatar';
import Icon from '../../../../components/Icon';
import {InputField} from '../../../../components/InputField';
import {User} from '../../../../models/User';
import {theme} from '../../../../styles/theme';
import {styles} from './styles';

type Props = {
    onSubmit: (comment: string) => void,
    user: User | null
}

export const CommentForm = ({onSubmit, user}: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    onSubmit(value);
    setValue('');
  };

  if (!user) {
    return null;
  }
  return (
    <View style={styles.wrapper}>
      <Avatar style={styles.avatar} image={user.mainPhoto?.image}/>
      <View style={styles.row}>
        <InputField
          placeholder='Написать комментарий'
          color={theme.main}
          value={value}
          onChangeText={setValue}
          onMouseEnter={handleSubmit}
          wrapperStyle={styles.input}
        />
        {!!value.length && <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
          <Icon name='compass' size={24}/>
        </TouchableOpacity>}
      </View>
    </View>
  );
};
