/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

const App = () => {
  const url = 'http://194.67.74.122:3000/user/all';
  const [text, setText] = useState('Текста нет!');

  const init = async () => {
    const res = await fetch(url, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoi0JrQuNGA0LjQu9C7IiwiaWF0IjoxNjUzODk2NzMxfQ.9cFWyFbHeD3lObW3SAxMF8iq-wExjSz-FfUeX_FvOg4',
      },
    });
    const json = await res.json();
    setText(JSON.stringify(json, null, 2));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <Text>{text}</Text>
    </SafeAreaView>
  );
};

export default App;
