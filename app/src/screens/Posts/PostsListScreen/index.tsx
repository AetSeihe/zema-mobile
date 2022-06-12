import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {CatAlert} from '../../../components/CatAlert';
import {routerNames} from '../../../constants/routerNames';
import {Post as PostModel} from '../../../models/Post';
import {User} from '../../../models/User';
import {postStore} from '../../../store/newsStore';
import {routerStore} from '../../../store/routerStore';
import {userStore} from '../../../store/userStore';
import {Post} from '../components/Post';
import {PostOptionsFilter} from '../components/PostOptionsFilter';
import {styles} from './styles';


const initialValues = {
  text: '',
  cityFrom: '',
  cityTo: '',
};


const FETCH_POST_LIMIT = 15;
let fetchPostOffset = 0;


const PostsScreen = () => {
  const [options, setOptions] = useState<typeof initialValues>(initialValues);

  useEffect(() => {
    postStore.fetchPostsIsNeverLoad({
      data: {},
      options: {},
    });
  }, []);


  const onSubmit = async (values: typeof initialValues) => {
    setOptions(values);
    fetchPostOffset = 0;
    postStore.fetchPosts({
      data: {
        text: values.text,
        cityFromId: +values.cityFrom,
        cityToId: +values.cityTo,
      },
      options: {
        limit: FETCH_POST_LIMIT,
        offset: fetchPostOffset,
      },
    });
  };

  const onPressProfile = async (user: User) => {
    routerStore.pushToScene({
      name: routerNames.PROFILE,
      options: {
        user: user,
      },
    });
  };


  const onPressLike = async (post: PostModel) => {
    const user = userStore.user;
    if (user) {
      postStore.likePost(post, user.id);
    }
  };

  const onPressLearnMore = async (post: PostModel) => {
    routerStore.pushToScene({
      name: routerNames.Post,
      options: {
        post: post,
      },
    });
  };

  const onScrollFlatList = () => {
    fetchPostOffset += FETCH_POST_LIMIT;

    postStore.listPosts({
      data: {
        text: options.text,
        cityFromId: +options.cityFrom,
        cityToId: +options.cityTo,
      },
      options: {
        limit: FETCH_POST_LIMIT,
        offset: fetchPostOffset,
      },
    });
  };

  const renderPosts = ({item}: ListRenderItemInfo<PostModel>) => {
    return (
      <View style={styles.postWrapper}>
        <View style={styles.post}>
          <Post post={item}
            onPressProfile={onPressProfile}
            onPressLearnMore={onPressLearnMore}
            onPressLike={onPressLike}/>
        </View>
      </View>);
  };


  return (
    <View style={styles.wrapper} >
      <View style={styles.content}>
        <View style={styles.form}>
          <PostOptionsFilter onSubmit={onSubmit} loading={false}/>
        </View>
        {!!postStore.posts.length ? (
          <FlatList
            onEndReached={onScrollFlatList}
            onEndReachedThreshold={0.2}
            data={postStore.posts}
            renderItem={renderPosts}
            keyExtractor={(item) => item.id.toString()}
          />) : <CatAlert title={'По вашему запросу ничего не найдено'}/>}
      </View>
    </View>
  );
};

export default observer(PostsScreen);
