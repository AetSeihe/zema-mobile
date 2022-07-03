import {Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ViewStyle} from 'react-native-material-ui';
import {Friend} from '../../models/Friend';
import {Avatar} from '../Avatar';
import {Card} from '../Card';
import {styles} from './styles';


type Props = {
    friend: Friend,
    onPress: (user: any) => void;
    renderButtons: (user: any) => React.ReactNode,
    wrapperStyle?: ViewStyle,
}

export const UserCard = ({friend, onPress, renderButtons}: Props) => {
  const user = friend?.user || friend;

  if (!user) {
    return null;
  }
  return (
    <Card >
      <TouchableOpacity onPress={() => onPress(friend)} style={styles.wrapper}>
        <Avatar image={user.mainPhoto?.image} style={styles.image}/>
        <View style={styles.content}>
          <Text style={styles.fullName}>{user.fullName}</Text>
          <Text style={styles.age}>{user.age} Лет</Text>
          <Text style={styles.interesting}>{user.interesting?.replace(/[\n]/gi, ' ').slice(0, 50).trim()}...</Text>
          {renderButtons(friend)}
        </View>
      </TouchableOpacity>

    </Card>
  );
};

