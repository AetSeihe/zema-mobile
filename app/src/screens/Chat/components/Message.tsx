import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {FadeIn, FadeOut, SlideInLeft, SlideInRight, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ImagesGallery from '../../../components/ImagesGallery';
import {Message as MessageModel} from '../../../models/Message';
import {User} from '../../../models/User';
import {theme} from '../../../styles/theme';
import {dateToString} from '../../../utils/dateToString';
import Icon from '../../../components/Icon';

const clockIcon = require('../images/clock.png');


type MessageFloatType = 'right' | 'left'
type Props = {
    user: User,
    message: MessageModel,
    float: MessageFloatType,
    onSwipeableOpen: (direction: 'right' | 'left', swipeable: Swipeable) => void;
}


const animationByMessageType = (float: MessageFloatType, sending?: boolean) => {
  return float === 'left' ? SlideInLeft : SlideInRight;
};

const Message = ({message, float, onSwipeableOpen}: Props) => {
  const animation = useSharedValue(message.isNewMessage ? 0 : 1);
  const reply = message.replies[0] || null;

  const messageAnimation = useAnimatedStyle(() => {
    return {
      maxHeight: animation.value === 0 ? 0: 'auto',
      paddingVertical: withTiming(animation.value * 10),
      marginVertical: withTiming(animation.value * 2.5),
    };
  });

  useEffect(() => {
    if (message.isNewMessage) {
      animation.value = 1;
    }
  }, []);

  return (
    <Swipeable
      onSwipeableOpen={onSwipeableOpen}
      renderRightActions={() => <Icon name='reply' size={20}/>}>
      <Animated.View
        entering={message.sending ? FadeIn:animationByMessageType(float)}
        exiting={FadeOut}
        style={[
          styles.wrapper, float === 'left' ? styles.floatLeft: styles.floatRight,
        message.images.length ? styles.fullWidth: {},
        message.isNewMessage ? messageAnimation: {},
        ]}
      >
        {message.sending && <Image style={styles.loading} source={clockIcon} />}
        {reply && (
          <View style={styles.reply}>
            <Text style={styles.replyText} numberOfLines={1}>{reply.reply.message}сыфвфвфывыфвфы ывыфвфыв фывфы</Text>
          </View>
        )}
        {!!message.images.length && <ImagesGallery images={message.images} wrapperStyle={styles.gallery}/> }
        <View style={styles.content}>
          <Text style={[styles.message, float === 'left' ? styles.textLeft: styles.textRight]}>
            {message.message}
          </Text>
          <View>
            <Text style={[styles.date, float === 'left' ? styles.textLeft: styles.textRight]}>{dateToString(new Date(message.createdAt))}</Text>
          </View>
        </View>
      </Animated.View >
    </Swipeable>
  );
};

const styles = StyleSheet.create({

  wrapper: {
    paddingVertical: 10,
    marginVertical: 2,
    maxWidth: '80%',
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  fullWidth: {
    width: '100%',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  gallery: {
  },

  reply: {
    fontSize: 10,
    borderLeftWidth: 1,
    paddingLeft: 5,
    borderColor: '#fff',
    marginBottom: 5,
  },
  replyText: {
    color: '#fff',
  },
  loading: {
    position: 'absolute',
    left: -20,
    bottom: 5,
    justifyContent: 'flex-end',
    width: 18,
    height: 18,
    opacity: 0.4,
  },
  floatLeft: {
    alignSelf: 'flex-start',
    backgroundColor: theme.gray,
  },
  textLeft: {
    color: '#000',
  },
  textRight: {
    color: '#fff',
  },
  floatRight: {
    alignSelf: 'flex-end',
    backgroundColor: theme.main,

  },
  message: {
    fontSize: 16,
  },
  date: {
    fontSize: 10,
    opacity: 0.5,
    marginLeft: 5,
  },
});

export default Message;
