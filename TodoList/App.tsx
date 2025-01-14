import React from 'react';
import {Text, View} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import TabNavigator from './src/navigators/TabNavigator';
import StackNavigator from './src/navigators/TodoListNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TodoListNavigator from './src/navigators/TodoListNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <TabNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
