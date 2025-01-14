import {View, Text} from 'react-native';
import React from 'react';
import TodoItem from '../components/todoList/TodoItem';
import {createStackNavigator} from '@react-navigation/stack';
import {Add} from 'iconsax-react-native';
import AddTodoList from '../components/todoList/AddTodoList';
import ShowTodoList from '../components/todoList/ShowTodoList';
import TodolistScreen from '../screens/TodolistScreen';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodoListDetail from '../components/todoList/TodoListDetail';

const Stack = createNativeStackNavigator();

const TodoListNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TodolistScreen"
        component={TodolistScreen}
        initialParams={{refresh: false}}
      />
      <Stack.Screen name="AddTodoList" component={AddTodoList} />
      <Stack.Screen name="TodoListDetail" component={TodoListDetail} />
    </Stack.Navigator>
  );
};
export default TodoListNavigator;
