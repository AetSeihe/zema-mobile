import {Text} from '@react-native-material/core';
import React from 'react';
import {Alert, Image, Linking, TouchableOpacity, View} from 'react-native';
import Markdown from 'react-native-markdown-package';

import {CommentImage} from '../../../../assets/images';
import Icon from '../../../../components/Icon';
import ImagesGallery from '../../../../components/ImagesGallery';
import {Post as PostModel} from '../../../../models/Post';
import {User} from '../../../../models/User';
import {userStore} from '../../../../store/userStore';
import {theme} from '../../../../styles/theme';
import {PostUserHeader} from '../PostUserHeader';
import {styles} from './styles';

type Props ={
  onPressProfile: (user: User) => void;
  onPressLike: (post: PostModel) => void;
  onPressLearnMore: (post: PostModel) => void;
  post: PostModel
}

const MAX_TEXT_LENGHT = 150;


export const Post = ({post, onPressLike, onPressLearnMore, onPressProfile}: Props) => {
  const currentText = post.text.slice(0, MAX_TEXT_LENGHT);
  const user = post.user;
  const appUser = userStore.user;
  if (!appUser) {
    return null;
  }

  const onPressLink = async (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Ошибка при переходе');
    });
  };

  return (
    <View style={styles.wrapper}>
      <PostUserHeader user={user} post={post} onPress={onPressProfile} />
      <View>
        <Text style={styles.title}>{post.title}</Text>
        <Markdown styles={{
          flex: 1,
        }}
        onLink={onPressLink}
        >{currentText}</Markdown>
        {post.text.length > currentText.length && (
          <TouchableOpacity onPress={() => onPressLearnMore(post)}>
            <Text style={styles.getAllLink}>Показать полностью</Text>
          </TouchableOpacity>)}
        <ImagesGallery images={post.images}/>
        <View style={styles.events}>
          <TouchableOpacity onPress={() => onPressLike(post)} activeOpacity={1}>
            <Icon name='heart' color={post.userLiked(appUser.id) ? theme.main : '#d4d4d4'} size={27}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressLearnMore(post)}>
            <Image source={CommentImage} style={styles.comments} resizeMode='contain'/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
