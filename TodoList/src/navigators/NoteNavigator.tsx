import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NoteScreen from '../screens/NoteScreen';
import NoteDetail from '../screens/note/NoteDetail';
import AddNote from '../screens/note/AddNote';

const Stack = createNativeStackNavigator();

const NoteNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NoteScreen"
        component={NoteScreen}
        initialParams={{refresh: false}}
      />
      <Stack.Screen name="NoteDetail" component={NoteDetail} />
      <Stack.Screen name="AddNote" component={AddNote} />
    </Stack.Navigator>
  );
};

export default NoteNavigator;
