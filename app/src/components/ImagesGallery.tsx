import React from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FileModule} from '../models/FileModule';
import {applicationStore} from '../store/applicationStore';

type Props = {
    wrapperStyle?: ViewStyle,
    images: FileModule[],
}


const ImagesGallery = ({wrapperStyle, images}:Props) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {images.map((image, i) => (
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={() => applicationStore.setFullScreenImage(image)}>
            <Image style={styles.image} resizeMode='cover' source={{
              uri: image.url,
            }}/>
          </TouchableOpacity>
        </View>
      ))}
    </View>

  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    marginHorizontal: -2,
  },

  imageWrapper: {
    flex: 1,
    width: '100%',
    minWidth: '33%',
    borderRadius: 5,
    padding: 2,

  },
  image: {
    borderRadius: 5,
    paddingBottom: '100%',

  },
});

export default ImagesGallery;
