import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import TodolistScreen from '../screens/TodolistScreen';
import NoteScreen from '../screens/NoteScreen';
import {createStackNavigator} from '@react-navigation/stack';
import TodoListNavigator from './TodoListNavigator';
import NoteNavigator from './NoteNavigator';
import HomeNavigator from './HomeNavigator';
import {
  Book,
  CardEdit,
  Home,
  Notification,
  SearchFavorite,
} from 'iconsax-react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              return <Home size={24} color={color} />;
            case 'Todolist':
              return <CardEdit size={24} color={color} />;
            case 'Note':
              return <Book size={24} color={color} />;
          }
        },
      })}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Todolist" component={TodoListNavigator} />
      <Tab.Screen name="Note" component={NoteNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
