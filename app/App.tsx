import React from 'react';
import {MainNavigator} from './src/navigation/MainNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {clearAuthUserData} from './src/utils/userAuthToken';

const App = () => {
  clearAuthUserData();
  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
};

export default App;
