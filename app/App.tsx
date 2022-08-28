import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainNavigator} from './src/navigation/MainNavigator';
import YaMap from 'react-native-yamap';


YaMap.init('d748e6db-f263-4064-b463-18d000e21d56');

const App = () => {
  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
};


export default App;

