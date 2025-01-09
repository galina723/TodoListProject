import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TodoListModel} from '../models/TodoModel';
import ShowTodoList from '../components/todoList/ShowTodoList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Status} from 'iconsax-react-native';

const TodolistScreen = () => {
  const [todo, setTodo] = useState<TodoListModel[]>([]);
  // const [todoItem, setTodoItem] = useState<TodoListModel>();
  const [contentInput, setContentInput] = useState<string>('');

  // const save = async() => {
  //   try {
  //     await AsyncStorage.setItem('todo', JSON.stringify(todo));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const addTodo = async () => {
    // const temp = todo;
    // temp.unshift({
    //   id: Math.random(),
    //   content: contentInput,
    // });
    // // console.log(temp);
    // setTodo(temp);
    // setContentInput('');
    try {
      const temp = todo;
      temp.unshift({
        id: Math.random(),
        content: contentInput,
        status: false,
      });
      await AsyncStorage.setItem('todo', JSON.stringify(temp));
      setContentInput('');
    } catch (error: any) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getTodo();
  // }, []);

  const getTodo = async () => {
    try {
      const temp = await AsyncStorage.getItem('todo');
      if (temp !== null) {
        setTodo(JSON.parse(temp));
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  function handleTextChange(text: string) {
    setContentInput(text);
  }

  const removeAllTodo = async () => {
    try {
      await AsyncStorage.removeItem('todo');
      setTodo([]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const temp = todo.filter(idd => idd.id !== id);
      await AsyncStorage.setItem('todo', JSON.stringify(temp));
      setTodo(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const doneTodo = (id: number) => {
    try {
      // const temp = todo.filter(idd => idd.id === id);
      // if (!temp[0].status) {
      //   temp[0].status = true;
      // } else {
      //   temp[0].status = false;
      // }
      // !temp[0].status ? temp[0].status = true : temp[0].status = false;
      // const array = todo.filter(idd => idd.id !== id);
      // const mang = array.concat(temp);
      // console.log(temp, array, mang);
      // setTodo(mang);
      let temp = todo.map(idd =>
        idd.id === id
          ? {
              ...idd,
              status: !idd.status,
            }
          : idd,
      );
      setTodo(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (id: number) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  // function deleteTodo(id: number) {
  //   let temp = [];
  //   temp = todo.filter(idd => idd.id !== id);
  //   setTodo(temp);
  //   console.log(temp);
  // }

  const renderTodoItem = useCallback((item: TodoListModel) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          backgroundColor: '#e0e0e0',
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 24, flex: 1}}>{item.content}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#e8e8e8',
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => deleteTodo(item.id)}>
          <Text
            style={{
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <View style={{flexDirection: 'column', gap: 16, padding: 16, flex: 1}}>
      <View style={{flexDirection: 'row', gap: 6}}>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            flex: 1,
            padding: 10,
          }}
          onChangeText={handleTextChange}
          placeholder="Add todo"
          value={contentInput}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#e7d7c9',
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={addTodo}>
          <Text
            style={{
              padding: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Add
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={removeAllTodo}
          style={{
            backgroundColor: '#514438',
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'column',
          gap: 16,
          padding: 7,
        }}>
        <FlatList
          data={todo}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{height: 5}}></View>}
          renderItem={({item}) => {
            return (
              <View>
                {/* {renderTodoItem(item)} */}
                <ShowTodoList
                  item={item}
                  deleteTodo={(id: number) => deleteTodo(id)}
                  doneTodo={(id: number) => doneTodo(id)}
                  editTodo={() => {}}
                />
              </View>
            );
          }}></FlatList>
        {/* <View  style={{
        flexDirection: 'row',
        gap: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
      }}>
            {todo.map((item) => {
              return (
                <ShowTodoList
                  item={item}
                  deleteTodo={(id: number) => deleteTodo(id)}
                />
              );
            })}
          </View> */}
      </View>
    </View>
  );
};

export default TodolistScreen;
