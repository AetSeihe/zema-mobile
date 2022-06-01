import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {postStore} from '../../store/newsStore';


const PostsScreen = () => {
  useEffect(() => {
    postStore.fetchPostsIsNeverLoad({
      data: {},
      options: {},
    });
  }, []);

  return (
    <>
      <Text>Список постов:</Text>
      {postStore.posts.map((post) => {
        return <Text>{post.id} {post.title}</Text>;
      })}
    </>
  );
};

export default observer(PostsScreen);
