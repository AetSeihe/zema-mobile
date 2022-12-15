import React from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import {FileModule} from '../models/FileModule';
type Props = {
    wrapperStyle: ViewStyle,
    images: FileModule[],
}


const ImagesGallery = ({wrapperStyle, images}:Props) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {images.map((image, i) => (
        <Image resizeMode='cover' style={styles.image} source={{
          uri: image.url,
        }}/>
      ))}
    </View>

  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    marginHorizontal: -3,
  },

  imageWrapper: {
    flex: 1,
    padding: 5,
  },
  image: {
    flex: 1,
    minWidth: '32%',
    paddingBottom: '56%',
    margin: 2,
    borderRadius: 5,
  },
});

export default ImagesGallery;
