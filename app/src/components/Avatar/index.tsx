import React from 'react';
import {Image, ImageStyle} from 'react-native';
import {NoPhotoImage} from '../../assets/images';
import {FileModule} from '../../models/FileModule';
import {styles} from './styles';


type Props = {
    image: FileModule | undefined,
    style?: ImageStyle
}

export const Avatar = ({image, style}: Props) => {
  if (image) {
    return <Image style={[styles.image, style]} source={{
      uri: image.url,
    }} resizeMode={'cover'}/>;
  }
  return <Image style={[styles.image, style]} source={NoPhotoImage} resizeMode={'cover'}/>;
};

