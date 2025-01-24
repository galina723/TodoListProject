import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Save2, CloseCircle, AddCircle} from 'iconsax-react-native';
import {TodoListModel} from '../../models/TodoModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Database} from '../../helpers/database';
import Snackbar from 'react-native-snackbar';

const AddTodoList = () => {
  const navigator: any = useNavigation();

  const [todo, setTodo] = useState<TodoListModel[]>([]);
  const [contentInput, setContentInput] = useState<string>('');

  // const addTodo = async () => {
  //   try {
  //     const temp = todo;
  //     temp.unshift({
  //       id: Math.random(),
  //       content: contentInput,
  //       status: false,
  //     });
  //     await AsyncStorage.setItem('todo', JSON.stringify(temp));
  //     setContentInput('');
  //     console.log(temp);
  //     // setNewContent(temp);
  //     navigator.replace('TodolistScreen', {refresh: true});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const addTodo = async () => {
    try {
      const temp = await AsyncStorage.getItem('todo');
      const parsedTodo = temp ? JSON.parse(temp) : [];
      if (contentInput) {
        parsedTodo.unshift({
          id: Math.random(),
          content: contentInput,
          status: false,
        });
        const data1 = [contentInput, false];
        //console.log(4567890);
        await insertUserToDB(data1);
        await AsyncStorage.setItem('todo', JSON.stringify(parsedTodo));
        setContentInput('');
        navigator.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'TodolistScreen',
                params: {refresh: true},
              },
            ],
          }),
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const insertUserToDB = async (data: any[]) => {
    const result = await Database.insertTable('todo', data, 'content, status');
    console.log(55555);
  };

  const handle = (text: string) => {
    setContentInput(text);
  };

  return (
    <View style={{flexDirection: 'column', gap: 10, flex: 1, padding: 10}}>
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          color: 'black',
        }}
        onChangeText={handle}
        value={contentInput}></TextInput>
      <View style={{flexDirection: 'row', gap: 10, justifyContent: 'flex-end'}}>
        <TouchableOpacity onPress={addTodo}>
          <AddCircle size="24" color="#FF8A65" />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <CloseCircle size="24" color="red" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default AddTodoList;
