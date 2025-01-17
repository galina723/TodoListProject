import React from 'react';
import {Text, View} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import TabNavigator from './src/navigators/TabNavigator';
import StackNavigator from './src/navigators/TodoListNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TodoListNavigator from './src/navigators/TodoListNavigator';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import LoginNavigator from './src/navigators/LoginNavigator';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <LoginNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
