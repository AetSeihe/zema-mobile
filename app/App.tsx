import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainNavigator} from './src/navigation/MainNavigator';
import {SkeletonContainer} from 'react-native-skeleton-component';
import {theme} from './src/styles/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import YaMap from 'react-native-yamap';
import FullScreenPhoto from './src/modals/FullScreenPhoto';

YaMap.init('9a008c7f-40ab-4197-b24f-ee3e92b8faa2');


const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <SkeletonContainer backgroundColor={theme.skeleton} highlightColor={theme.highlightSceleton}>
          <MainNavigator />
        </SkeletonContainer>
      </SafeAreaProvider>
      <FullScreenPhoto />
    </GestureHandlerRootView>

  );
};


export default App;

