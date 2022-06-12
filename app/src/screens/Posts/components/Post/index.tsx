import {Text} from '@react-native-material/core';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {CommentImage} from '../../../../assets/images';
import Icon from '../../../../components/Icon';
import {FileModule} from '../../../../models/FileModule';
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

  const renderImages = (images: FileModule[]) => {
    const file = images[0];
    if (!file) {
      return null;
    }
    return (
      <View style={styles.imageContainer}>
        <Image resizeMode='cover' style={styles.image} source={{
          uri: file.url,
        }}/>
        {images.length > 1 && (
          <TouchableOpacity onPress={() => onPressLearnMore(post)} style={styles.imageText}>
            <Text>и еще {images.length - 1} фотографий </Text>
            <Icon name='camera' size={20}/>
          </TouchableOpacity>
        )}
      </View>);
  };


  return (
    <View style={styles.wrapper}>
      <PostUserHeader user={user} post={post} onPress={onPressProfile} />
      <View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.text} >{currentText}</Text>
        {post.text.length > currentText.length && (
          <TouchableOpacity onPress={() => onPressLearnMore(post)}>
            <Text style={styles.getAllLink}>Показать полностью</Text>
          </TouchableOpacity>)}
        {renderImages(post.images)}
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
