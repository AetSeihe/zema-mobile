import {Text} from '@react-native-material/core';
import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, InteractionManager, ListRenderItemInfo, ScrollView, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar} from '../../../components/Avatar';
import {routerNames} from '../../../constants/routerNames';
import {Comment} from '../../../models/Comment';
import {FileModule} from '../../../models/FileModule';
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

const renderImages = (images: FileModule[]) => {
  return images.map((image) => (
    <Image resizeMode='cover' style={styles.image} source={{
      uri: image.url,
    }}/>
  ));
};


const PostS = ({navigation, route}: Props) => {
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
  };

  const renderComment = ({item}: ListRenderItemInfo<Comment>) => {
    const user = item.user;
    const canDeleteComment = item.userId === userStore.user?.id || post.userId == userStore.user?.id;
    const goToProfile = () => {
      routerStore.pushToScene({
        name: routerNames.PROFILE,
        options: {
          user: user,
        },
      });
    };


    const deleteComment = () => {
      postStore.deleteComment(item);
      setComments((prev) => prev.filter((comment) => comment.id !== item.id));
    };

    return (
      <View style={commentStyles.wrapper}>
        <TouchableOpacity onPress={goToProfile}>
          <Avatar image={user.mainPhoto?.image} style={commentStyles.avatar}/>
        </TouchableOpacity>
        <View style={commentStyles.content}>
          <TouchableOpacity onPress={goToProfile}>
            <Text style={commentStyles.title}>{user.fullName}</Text>
          </TouchableOpacity>
          <Text style={commentStyles.text}>{item.text}</Text>
          {canDeleteComment && (
            <TouchableOpacity onPress={deleteComment}>
              <Text style={commentStyles.delete}>Удалить</Text>
            </TouchableOpacity>)}
        </View>
      </View>);
  };

  return (
    <ScrollView style={styles.scrollView} keyboardShouldPersistTaps={'always'}>
      <View style={styles.wrapper}>
        <PostUserHeader user={post.user} post={post} onPress={onPressProfile} />
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.text}>{post.text}</Text>
        {renderImages(post.images)}
      </View>
      <SafeAreaView edges={['bottom']} style={styles.commentForm}>
        <FlatList
          ListHeaderComponent={() => <CommentForm onSubmit={handleSubmitComment} user={userStore.user}/>}
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps={'always'}
        />
      </SafeAreaView>
    </ScrollView>
  );
};


export const PostScreen = observer(PostS);
