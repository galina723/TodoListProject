import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import TodolistScreen from '../screens/TodolistScreen';
import NoteScreen from '../screens/NoteScreen';
import {createStackNavigator} from '@react-navigation/stack';
import TodoListNavigator from './TodoListNavigator';
import NoteNavigator from './NoteNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Todolist" component={TodoListNavigator} />
        <Tab.Screen name="Note" component={NoteNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
