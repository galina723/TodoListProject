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
import {Add, Status} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const TodolistScreen = () => {
  const route: any = useRoute();
  const {refresh} = route.params;

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

  useEffect(() => {
    getTodo();
  }, [refresh]);

  const navigator: any = useNavigation();

  const addTodo = async () => {
    try {
      const temp = todo;
      if (contentInput) {
        temp.unshift({
          id: Math.random(),
          content: contentInput,
          status: false,
        });
        await AsyncStorage.setItem('todo', JSON.stringify(temp));
        setContentInput('');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const saveNewData = async (id: number) => {
    let temp = todo.map(idd => {
      return idd.id == id
        ? {
            ...idd,
            content: contentInput,
          }
        : idd;
    });
    await AsyncStorage.setItem('todo', JSON.stringify(temp));
    setTodo(temp);
  };

  const getTodo = async () => {
    try {
      const temp = await AsyncStorage.getItem('todo');
      // console.log('aaa', temp);
      if (temp) {
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

  const doneTodo = async (id: number) => {
    try {
      let temp = todo.map(idd =>
        //
        {
          return idd.id === id
            ? {
                ...idd,
                status: !idd.status,
              }
            : idd;
        },
      );
      await AsyncStorage.setItem('todo', JSON.stringify(temp));
      setTodo(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (id: number, content: string) => {
    try {
      let temp = todo.map(idd => {
        return idd.id === id
          ? {
              ...idd,
              content: content,
            }
          : idd;
      });
      // console.log(id, content);
      await AsyncStorage.setItem('todo', JSON.stringify(temp));
      setTodo(temp);
    } catch (error) {
      console.log(error);
    }
  };

  // const renderTodoItem = useCallback((item: TodoListModel) => {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         gap: 16,
  //         backgroundColor: '#e0e0e0',
  //         borderRadius: 10,
  //       }}>
  //       <Text style={{fontSize: 24, flex: 1}}>{item.content}</Text>
  //       <TouchableOpacity
  //         style={{
  //           backgroundColor: '#e8e8e8',
  //           alignSelf: 'flex-start',
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //         }}
  //         onPress={() => deleteTodo(item.id)}>
  //         <Text
  //           style={{
  //             padding: 5,
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           }}>
  //           Delete
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }, []);

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
          placeholder="Add "
          value={contentInput}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#ffd3b9',
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
            backgroundColor: '#c45258',
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
                  editTodo={(id: number, content: string) =>
                    editTodo(id, content)
                  }
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
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          position: 'absolute',
          bottom: 10,
          right: 10,
          borderRadius: 30,
          backgroundColor: 'red',
        }}
        onPress={() => navigator.navigate('AddTodoList')}>
        <Add size="32" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default TodolistScreen;
