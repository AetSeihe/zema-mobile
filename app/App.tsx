import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainNavigator} from './src/navigation/MainNavigator';
import YaMap from 'react-native-yamap';
import {SkeletonContainer} from 'react-native-skeleton-component';
import {theme} from './src/styles/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';


YaMap.init('d748e6db-f263-4064-b463-18d000e21d56');

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <SkeletonContainer backgroundColor={theme.skeleton} highlightColor={theme.highlightSceleton}>
          <MainNavigator />
        </SkeletonContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>

  );
};


export default App;

