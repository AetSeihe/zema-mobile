import {Text} from '@react-native-material/core';
import React from 'react';
import {Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import Animated, {FadeIn, FadeInDown, FadeOutDown, Layout, SlideInRight, SlideOutDown, SlideOutRight} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../../../components/Icon';
import {Message} from '../../../models/Message';
import {theme} from '../../../styles/theme';


type Props = {
    onPressAddImage: () => void;
    onTextChange: (text: string) => void;
    value: string;
    images: Asset[],
    onPressDeleteImage: (img: Asset) => void;
    onPressSend: () => void;
    replyMessage?: Message | null,
    onCloseReply: () => void;
}

const ChatFooter = ({value,
  onTextChange,
  images,
  onPressAddImage,
  onPressSend,
  onPressDeleteImage,
  replyMessage,
  onCloseReply,
}: Props) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View>
        {!!images.length && (
          <Animated.ScrollView
            horizontal
            style={styles.imagesWrapper}
          >
            {images.map((image) => (
              <Animated.View
                key={image.fileName}
                entering={FadeIn}
                exiting={SlideOutDown}
                layout={Layout.springify()}
                style={styles.imageWrapper}>
                <Image resizeMode='cover' key={image.id} source={{
                  uri: image.uri,
                }}
                style={styles.image}
                />
                <TouchableOpacity style={styles.imageDelete} onPress={() => onPressDeleteImage(image)}>
                  <Icon name='cross' color={theme.main} size={15}/>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Animated.ScrollView>
        )}
      </View>
      {replyMessage && (
        <Animated.View entering={FadeInDown} exiting={FadeOutDown} style={styles.replyMessageWrapper}>
          <Text numberOfLines={1} style={styles.replyMessage}>{replyMessage.message}</Text>
          <TouchableOpacity style={styles.replyMessageClose} onPress={onCloseReply}>
            <Icon name='cross' size={15} color={'gray'}/>
          </TouchableOpacity>
        </Animated.View>
      )}
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <TouchableOpacity onPress={onPressAddImage} style={styles.photoIconWrapper}>
          <Icon name="camera" size={25} color={'gray'}/>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder='Сообщение'
          onChangeText={onTextChange}
          value={value}
          multiline
        />
        {(!!value || !!images.length) && (
          <Animated.View entering={SlideInRight} exiting={SlideOutRight} style={styles.sendMessage}>
            <TouchableOpacity onPress={onPressSend}>
              <Icon name="arrow-up2" size={25}color={'gray'}/>
            </TouchableOpacity>
          </Animated.View >
        )}

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  replyMessageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  replyMessage: {
    backgroundColor: theme.gray,
    padding: 5,
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
  },
  replyMessageClose: {
  },
  safe: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    borderRadius: 10,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: theme.gray,
    flexDirection: 'row',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 5,
  },
  imageDelete: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
  },
  imagesWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: 150,
    height: 120,
    borderRadius: 5,
    backgroundColor: 'gray',
  },

  photoIconWrapper: {
    marginRight: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: theme.gray,
    marginRight: 5,
    textAlignVertical: 'center'

  },
  sendMessage: {
    marginBottom: 10,
  },


});

export default ChatFooter;
