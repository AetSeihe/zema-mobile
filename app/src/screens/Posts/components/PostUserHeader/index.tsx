import {Text} from '@react-native-material/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar} from '../../../../components/Avatar';
import {Post} from '../../../../models/Post';
import {User} from '../../../../models/User';
import {styles} from './styles';

type Props ={
    user: User,
    post: Post,
    onPress: (user: User) => void
}


export const PostUserHeader = ({user, onPress, post}: Props) => {
  const mainPhoto = user.mainPhoto;

  return (
    <TouchableOpacity onPress={() => onPress(user)} style={styles.wrapper}>
      <Avatar image={mainPhoto?.image} style={styles.image}/>
      <View >
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.createdDate}>{post.dateCreated}</Text>
      </View>
    </TouchableOpacity>
  );
};
