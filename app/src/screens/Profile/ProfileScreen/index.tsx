import {Button} from '@react-native-material/core';
import {NavigationProp} from '@react-navigation/core';
import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, ListRenderItemInfo, View} from 'react-native';
import {routerNames} from '../../../constants/routerNames';
import {FileModule} from '../../../models/FileModule';
import {Post as PostModel} from '../../../models/Post';
import {User} from '../../../models/User';
import {postService} from '../../../services/postServices';
import {userService} from '../../../services/userService';
import {postStore} from '../../../store/newsStore';
import {routerStore} from '../../../store/routerStore';
import {userStore} from '../../../store/userStore';
import {theme} from '../../../styles/theme';
import {ProfileScreenOptionsType} from '../../../types/routerTypes';
import {Post} from '../../Posts/components/Post';
import {ProfileHeader} from '../components/ProfileHeader';
import {styles} from './styles';


type Props = {
  navigation: NavigationProp<any>,
  route: {
    params: ProfileScreenOptionsType
  }
}


const renderPhoto = ({item}: ListRenderItemInfo<FileModule>) => {
  return <Image source={{
    uri: item.url,
  }} style={styles.image}/>;
};

const onPressProfile = async (user: User) => {
  routerStore.pushToScene({
    name: routerNames.PROFILE,
    options: {
      user: user,
    },
  });
};


const onPressLearnMore = async (post: PostModel) => {
  routerStore.pushToScene({
    name: routerNames.Post,
    options: {
      post: post,
    },
  });
};

const goToSettings = () => {
  routerStore.pushToScene({
    name: routerNames.PROFILE_SETTING,
    options: {},
  });
};

const FETCH_POST_LIMIT = 15;


const ProfileS = ({route, navigation}:Props) => {
  const userApp = userStore.user;
  const [user, setUser] = useState<User>(route.params.user);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const fetchPostOffset = useRef(0);


  const fetchPosts = async () => {
    const currentPosts = await postService.getAllPosts({
      data: {
        userId: user.id,
      },
      options: {
        limit: FETCH_POST_LIMIT,
        offset: fetchPostOffset.current,
      },
    });

    fetchPostOffset.current += FETCH_POST_LIMIT;
    setPosts((posts) => [...posts, ...currentPosts]);
  };


  const initScreen = async () => {
    navigation.setOptions({
      title: user.fullName,
    });
    const currentData = await userService.getUserById(user.id);
    fetchPosts();
    setUser(currentData);
  };

  useEffect(() => {
    initScreen();
  }, []);


  if (!userApp) {
    return null;
  }

  const onPressLike = async (post: PostModel) => {
    const currentPost = await postStore.likePost(post, userApp.id);
    if (!currentPost) {
      return;
    }
    setPosts((posts) => posts.map((p) => {
      if (p.id === post.id) {
        return currentPost;
      }

      return p;
    }));
  };

  const renderProfileButtons = (user: User) => {
    if (user.id === userApp.id) {
      return <Button
        title={'Редактировать'}
        color={theme.main}
        titleStyle={styles.buttonText}
        onPress={goToSettings}
      />;
    }
    return <></>;
  };

  const renderPost = ({item}: ListRenderItemInfo<PostModel>)=> {
    return (
      <View style={styles.postWrapper}>
        <Post post={item}
          onPressProfile={onPressProfile}
          onPressLearnMore={onPressLearnMore}
          onPressLike={onPressLike}/>
      </View>);
  };


  return (
    <View >
      <View>
        <FlatList
          ListHeaderComponent={() => <ProfileHeader
            user={user}
            posts={posts}
            renderProfileButtons={renderProfileButtons}
            renderPhoto={renderPhoto}
          />}
          data={posts}
          onEndReached={fetchPosts}
          onEndReachedThreshold={0.2}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};


export const Profile = observer(ProfileS);
