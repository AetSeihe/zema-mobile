import {useNavigation} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Alert, SectionList, SectionListData, StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Animated, {SlideInLeft, SlideOutLeft} from 'react-native-reanimated';
import {Skeleton, SkeletonContainer} from 'react-native-skeleton-component';
import {routerNames} from '../../constants/routerNames';
import {Message as MessageModel} from '../../models/Message';
import {chatStore} from '../../store/chatStore';
import {routerStore} from '../../store/routerStore';
import {userStore} from '../../store/userStore';
import {getNameMonthByNumber} from '../../utils/getNameMonthByNumber';
import ChatFooter from './components/ChatFooter';
import DateHeader from './components/DateHeader';
import Header from './components/Header';
import Message from './components/Message';


const JUST_NOW_STRING = 'Сегодня';


type Props = {
    route: {
        params: {
            userId: number
        }
    }
}


const MAX_PHOTO_COUNT = 10;


const getMessagesSections = (messages: MessageModel[]): SectionListData<MessageModel>[] => {
  const sections: SectionListData<MessageModel, any>[] = [];
  const now = new Date();
  messages.forEach((message) => {
    const messageCreatedAtDate = message.createdAt;
    if (messageCreatedAtDate.getFullYear() === now.getFullYear() &&
     messageCreatedAtDate.getMonth() === now.getMonth() &&
     messageCreatedAtDate.getDate() === now.getDate() ) {
      const candidate = sections.find((sec) => sec.title === JUST_NOW_STRING);
      if (candidate) {
        candidate.data.push(message);
        return;
      }
      sections.push({
        title: JUST_NOW_STRING,
        data: [message],
      });
      return;
    }
    const date = `${messageCreatedAtDate.getDate()} ${getNameMonthByNumber(messageCreatedAtDate.getMonth())} ${messageCreatedAtDate.getFullYear()}`;
    const candidate = sections.find((sec) => sec.title === date);
    if (candidate) {
      candidate.data.push(message);
    } else {
      sections.push({
        title: date,
        data: [message],
      });
    }
  });


  return sections;
};

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
  const companion = chatStore.activeChat?.companion;
  const messages = chatStore.currentMessageList;

  const handlePressBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    routerStore.pushToScene({
      name: routerNames.HOME,
    });
  };

  const init = async () => {
    if (userStore.user?.id) {
      try {
        await chatStore.getActiveChatByUsers(userStore.user?.id, route.params.userId);
        await chatStore.fetchMessagesFromActiveChat();
      } catch (e) {
        Alert.alert('Ошибка!', 'Пользователь вас заблокировал');
        handlePressBack();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);


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
         <SectionList
           inverted
           keyExtractor={(item) => item.id.toString()}
           sections={getMessagesSections(messages)}
           renderSectionFooter={({section: {title}}) => (
             <DateHeader title={title}/>
           )}
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


