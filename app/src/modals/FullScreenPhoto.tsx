import {observer} from 'mobx-react';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {FadeIn, FadeOut, SlideInLeft, SlideOutRight} from 'react-native-reanimated';
import Icon from '../components/Icon';
import {applicationStore} from '../store/applicationStore';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {saveFileToDevice} from '../utils/saveFile';


const FullScreenPhoto = () => {
  const photo = applicationStore.fullScreenImage;

  if (!photo) {
    return null;
  }

  const onPressSavePhoto = async () => {
    try {
      await saveFileToDevice(photo);
      applicationStore.clearFullScreenImage();
    } catch (e) {
      Alert.alert('Что-то пошло не так');
    }
  };

  return (
    <Animated.View
      exiting={FadeOut.duration(400)}
      entering={FadeIn.duration(400)}
      style={styles.wrapper}
    >
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity onPress={() => applicationStore.clearFullScreenImage()} style={styles.closeIcon}>
          <Icon name='cross' color={'#000'} size={20}/>
        </TouchableOpacity>

        <Animated.Image
          resizeMode='contain'
          entering={SlideInLeft.delay(200)}
          exiting={SlideOutRight}
          style={styles.image}
          source={{
            uri: photo.url,
          }}/>
        <TouchableOpacity onPress={onPressSavePhoto} style={styles.closeIcon}>
          <Icon name='folder-download' color={'#000'} size={20}/>
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    backgroundColor: '#000',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  image: {
    alignSelf: 'center',
    width: '100%',
    flex: 1,
    zIndex: -1,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    shadowColor: '#000',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
});

export default observer(FullScreenPhoto);
