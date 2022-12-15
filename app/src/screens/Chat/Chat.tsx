import {useNavigation} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Animated, {SlideInLeft, SlideOutLeft} from 'react-native-reanimated';
import {Skeleton, SkeletonContainer} from 'react-native-skeleton-component';
import {routerNames} from '../../constants/routerNames';
import {Message as MessageModel} from '../../models/Message';
import {chatStore} from '../../store/chatStore';
import {routerStore} from '../../store/routerStore';
import {userStore} from '../../store/userStore';
import ChatFooter from './components/ChatFooter';
import Header from './components/Header';
import Message from './components/Message';

type Props = {
    route: {
        params: {
            userId: number
        }
    }
}

const MAX_PHOTO_COUNT = 10;

const MockChatList = () => {
  return (
    <SkeletonContainer>
      <Skeleton style={[styles.skeletonMessage, {height: 100, width: '70%'}]}/>
      <Skeleton style={[styles.skeletonMessage, {height: 200, width: '80%'}]}/>
      <Skeleton style={[styles.skeletonMessage, {height: 50, width: '30%'}]}/>
      <Skeleton style={[styles.skeletonMessage, {height: 40, width: '20%'}]}/>
      <Skeleton style={[styles.skeletonMessage, {height: 150, width: '80%'}]}/>
      <Skeleton style={[styles.skeletonMessage, {height: 40, width: '20%'}]}/>
      <Skeleton style={[styles.skeletonMessage, {height: 40, width: '20%'}]}/>
      <Skeleton style={[styles.skeletonMessage, {height: 40, width: '20%'}]}/>
    </SkeletonContainer>
  );
};

const Chat = ({route}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Asset[]>([]);
  const [replyMessage, setReplyMessage] = useState<MessageModel | null>(null);
  const chatFlatList = useRef<FlatList<MessageModel> | null>(null);
  const companion = chatStore.activeChat?.companion;
  const messages = chatStore.currentMessageList;


  const init = async () => {
    if (userStore.user?.id) {
      await chatStore.getActiveChatByUsers(userStore.user?.id, route.params.userId);
      await chatStore.fetchMessagesFromActiveChat();
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);


  const handlePressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    routerStore.pushToScene({
      name: routerNames.HOME,
    });
  };

  const onPressAddImage = async () => {
    if (images.length == MAX_PHOTO_COUNT) {
      Alert.alert(`максимальное количество фото которое можно прикрепить ${MAX_PHOTO_COUNT}`);
      return;
    }
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    const imageAsset = result.assets;
    if (imageAsset && imageAsset[0]) {
      setImages((images) => ([...images, imageAsset[0]]));
    }
  };


  const onPressDeleteImage = (img: Asset) => {
    setImages((prev) => prev.filter((image) => image.fileName !== img.fileName));
  };

  const onPressSend = () => {
    if (userStore.user && chatStore.activeChat) {
      chatStore.sendMessage(chatStore.activeChat, userStore.user, inputValue, images, replyMessage?.id);
    }
    setInputValue('');
    setImages([]);
    setReplyMessage(null);
  };

  const onSwipeableOpen = (item: MessageModel) => {
    return (direction: 'left' | 'right', swipeable: Swipeable) => {
      setReplyMessage(item);
      swipeable.close();
    };
  };

  return (
    <View style={styles.wrapper}>
      <Header
        loading={loading}
        fullName={companion?.fullName}
        img={companion?.mainPhoto?.image}
        onPressBack={handlePressBack}/>
      <View style={styles.content}>
        {!loading && chatStore.activeChat && companion ? (
         <FlatList
           inverted
           keyExtractor={(item) => item.id.toString()}
           ref={(ref) => {
             chatFlatList.current = ref;
           }}
           data={messages}
           renderItem={({item}) =>
             <Message
               onSwipeableOpen={onSwipeableOpen(item)}
               user={item.userId === companion.id ? companion: userStore.user }
               message={item}
               float={item.userId === userStore.user?.id ? 'right': 'left'}
             />
           }/>
        ): (
          <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
            <MockChatList />
          </Animated.View>
        )}

      </View>
      <ChatFooter
        onCloseReply={() => setReplyMessage(null)}
        replyMessage={replyMessage}
        images={images}
        value={inputValue}
        onTextChange={setInputValue}
        onPressAddImage={onPressAddImage}
        onPressDeleteImage={onPressDeleteImage}
        onPressSend={onPressSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 5,
  },
  skeletonMessage: {
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default observer(Chat);


