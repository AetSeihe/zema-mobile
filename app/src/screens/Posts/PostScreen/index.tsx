import {Text} from '@react-native-material/core';
import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, InteractionManager, Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import Animated, {Layout, SlideInLeft, SlideOutRight} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-package';
import {Avatar} from '../../../components/Avatar';
import ImagesGallery from '../../../components/ImagesGallery';
import {routerNames} from '../../../constants/routerNames';
import {Comment} from '../../../models/Comment';
import {Post} from '../../../models/Post';
import {User} from '../../../models/User';
import {postService} from '../../../services/postServices';
import {postStore} from '../../../store/newsStore';
import {routerStore} from '../../../store/routerStore';
import {userStore} from '../../../store/userStore';
import {PostScreenOptionsType} from '../../../types/routerTypes';
import {CommentForm} from '../components/CommentForm';
import {PostUserHeader} from '../components/PostUserHeader';
import {commentStyles, styles} from './styles';


type Props = {
  navigation: NavigationProp<any>,
  route: {
    params: PostScreenOptionsType
  }
}

const PostS = ({navigation, route}: Props) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [post, setPost] = useState<Post>(route.params.post);
  const [comments, setComments] = useState<Comment[]>(route.params.post.comments);


  const getPost = async () => {
    const currentPostData = await postService.getPostById(post.id);
    setPost(currentPostData);
    setComments(currentPostData.comments);
  };


  useEffect(() => {
    navigation.setOptions({
      title: post.title,
    });
    InteractionManager.runAfterInteractions(getPost);
  }, []);

  const onPressProfile = (user: User) => {
    routerStore.pushToScene({
      name: routerNames.PROFILE,
      options: {
        user: user,
      },
    });
  };

  const handleSubmitComment = async (comment: string) => {
    const newComment = await postStore.commentPost(comment, post.id);
    setComments((comments) => [...comments, newComment]);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 20);
  };

  const renderComment = (comment: Comment) => {
    const user = comment.user;
    const canDeleteComment = comment.userId === userStore.user?.id || post.userId == userStore.user?.id;
    const goToProfile = () => {
      routerStore.pushToScene({
        name: routerNames.PROFILE,
        options: {
          user: user,
        },
      });
    };


    const deleteComment = () => {
      postStore.deleteComment(comment);
      setComments((prev) => prev.filter((com) => com.id !== comment.id));
    };

    return (
      <Animated.View
        key={comment.id}
        layout={Layout.springify()}
        entering={SlideInLeft}
        exiting={SlideOutRight}
        style={commentStyles.wrapper}
      >
        <TouchableOpacity onPress={goToProfile}>
          <Avatar image={user.mainPhoto?.image} style={commentStyles.avatar}/>
        </TouchableOpacity>
        <View style={commentStyles.content}>
          <TouchableOpacity onPress={goToProfile}>
            <Text style={commentStyles.title}>{user.fullName}</Text>
          </TouchableOpacity>
          <Text style={commentStyles.text}>{comment.text}</Text>
          {canDeleteComment && (
            <TouchableOpacity onPress={deleteComment}>
              <Text style={commentStyles.delete}>Удалить</Text>
            </TouchableOpacity>)}
        </View>
      </Animated.View>);
  };

  const onPressLink = async (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Ошибка при переходе');
    });
  };

  return (
    <>
      <ScrollView
        ref={(ref) => (scrollViewRef.current = ref)}
        style={styles.scrollView}
        keyboardShouldPersistTaps={'always'}>
        <View style={styles.wrapper}>
          <PostUserHeader user={post.user} post={post} onPress={onPressProfile} />
          <Text style={styles.title}>{post.title}</Text>
          <Markdown styles={{
            flex: 1,
          }}
          onLink={onPressLink}
          >{post.text}</Markdown>
          <ImagesGallery images={post.images}/>
        </View>
        {comments.map(renderComment)}
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.commentForm}>
        <CommentForm onSubmit={handleSubmitComment} user={userStore.user}/>
      </SafeAreaView>

    </>
  );
};


export const PostScreen = observer(PostS);
