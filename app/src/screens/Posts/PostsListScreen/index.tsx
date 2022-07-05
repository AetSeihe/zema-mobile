import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {CatAlert} from '../../../components/CatAlert';
import {Tint} from '../../../components/Tint';
import {routerNames} from '../../../constants/routerNames';
import {Post as PostModel} from '../../../models/Post';
import {User} from '../../../models/User';
import {cityServices} from '../../../services/cityServices';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    postStore.fetchPostsIsNeverLoad({
      data: {},
      options: {},
    });
  }, []);


  const onSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    const cityFrom = await cityServices.getCityByName(values.cityFrom);
    const cityTo = await cityServices.getCityByName(values.cityTo);

    setOptions(values);
    fetchPostOffset = 0;
    await postStore.fetchPosts({
      data: {
        text: values.text,
        cityFromId: cityFrom[0]?.id,
        cityToId: cityTo[0]?.id,
      },
      options: {
        limit: FETCH_POST_LIMIT,
        offset: fetchPostOffset,
      },
    });
    setLoading(false);
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
          <PostOptionsFilter onSubmit={onSubmit} loading={loading}/>
        </View>
        <FlatList
          onEndReached={onScrollFlatList}
          ListEmptyComponent={<CatAlert title={'По вашему запросу ничего не найдено'}/>}
          ListFooterComponent={<Tint style={styles.tint}>{postStore.loading ? 'Загрузка': 'Вы просмотрели все новости за сегодня'}</Tint>}
          onEndReachedThreshold={0.2}
          data={postStore.posts}
          renderItem={renderPosts}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default observer(PostsScreen);
