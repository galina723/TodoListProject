import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Login from '../components/login/Login';
import Register from '../components/login/Register';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();
const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}}>
      <Stack.Screen
        name="Login"
        component={Login}
        initialParams={{refresh: false}}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
