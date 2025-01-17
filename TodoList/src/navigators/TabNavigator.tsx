import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import TodolistScreen from '../screens/TodolistScreen';
import NoteScreen from '../screens/NoteScreen';
import {createStackNavigator} from '@react-navigation/stack';
import TodoListNavigator from './TodoListNavigator';
import NoteNavigator from './NoteNavigator';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Todolist" component={TodoListNavigator} />
      <Tab.Screen name="Note" component={NoteNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
