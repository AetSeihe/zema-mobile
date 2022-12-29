import React from 'react';
import {Image, ImageStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {NoPhotoImage} from '../../assets/images';
import {FileModule} from '../../models/FileModule';
import {applicationStore} from '../../store/applicationStore';
import {styles} from './styles';


type Props = {
    image: FileModule | undefined,
    style?: ImageStyle
}

export const Avatar = ({image, style}: Props) => {
  const onPressAvatar = () => {
    if (image) {
      applicationStore.setFullScreenImage(image);
    }
  };
  if (image) {
    return <TouchableWithoutFeedback onPress={onPressAvatar}>
      <Image style={[styles.image, style]} source={{
        uri: image.url,
      }} resizeMode={'cover'}/>
    </TouchableWithoutFeedback>;
  }
  return <Image style={[styles.image, style]} source={NoPhotoImage} resizeMode={'cover'}/>;
};

