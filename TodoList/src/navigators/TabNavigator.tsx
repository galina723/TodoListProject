import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import TodolistScreen from "../screens/TodolistScreen";
import NoteScreen from "../screens/NoteScreen";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Todolist" component={TodolistScreen} />
      <Tab.Screen name="Settings" component={NoteScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;

