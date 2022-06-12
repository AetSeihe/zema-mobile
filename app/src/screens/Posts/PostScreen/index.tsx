import {Text} from '@react-native-material/core';
import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {routerNames} from '../../../constants/routerNames';
import {FileModule} from '../../../models/FileModule';
import {Post} from '../../../models/Post';
import {User} from '../../../models/User';
import {postService} from '../../../services/postServices';
import {postStore} from '../../../store/newsStore';
import {routerStore} from '../../../store/routerStore';
import {CommentType} from '../../../types/postTypes';
import {PostScreenOptionsType} from '../../../types/routerTypes';
import {CommentForm} from '../components/CommentForm';
import {PostUserHeader} from '../components/PostUserHeader';
import {styles} from './styles';


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

const renderComment = ({item}: any) => {
  return <Text>{item.text}</Text>;
};

const PostS = ({navigation, route}: Props) => {
  const [post, setPost] = useState<Post>(route.params.post);
  const [comments, setComments] = useState<CommentType[]>(route.params.post.comments);


  const getPost = async () => {
    const currentPostData = await postService.getPostById(post.id);
    setPost(currentPostData);
    setComments(currentPostData.comments);
  };


  useEffect(() => {
    navigation.setOptions({
      title: post.title,
    });

    getPost();
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

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <PostUserHeader user={post.user} post={post} onPress={onPressProfile} />
        <Text style={styles.title}>{post.title} {post.id}</Text>
        <Text style={styles.text}>{post.text}</Text>
        {renderImages(post.images)}
      </View>
      <SafeAreaView edges={['bottom']} style={styles.commentForm}>
        <FlatList
          ListHeaderComponent={() => <CommentForm onSubmit={handleSubmitComment}/>}
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </ScrollView>
  );
};


export const PostScreen = observer(PostS);
