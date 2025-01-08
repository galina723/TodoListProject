import React, {useCallback, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { TodoListModel } from '../models/TodoModel';
import ShowTodoList from '../components/todoList/ShowTodoList';

const TodolistScreen = () => {
  const [todo, setTodo] = useState<TodoListModel[]>([]);
  // const [todoItem, setTodoItem] = useState<TodoListModel>();
  const [contentInput, setContentInput] = useState<string>('');

  function addTodo() {
    const temp = todo;
    temp.unshift({
      id: Math.random(),
      content: contentInput,
    });
    // console.log(temp);
    setTodo(temp);
    setContentInput('');
  }

  function handleTextChange(text: string) {
    setContentInput(text);
  }

  function deleteTodo(id: number) {
    let temp = [];
    temp = todo.filter(idd => idd.id !== id);
    // console.log(temp);
    setTodo(temp);
  }

  const renderTodoItem =useCallback((item: TodoListModel) => {
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
      <View style={{flexDirection: 'row', gap: 16}}>
        <TextInput
          style={{backgroundColor: 'white', borderRadius: 10, flex: 1}}
          onChangeText={handleTextChange}
          placeholder="Add todo"
          value={contentInput}/>
        <TouchableOpacity
          style={{
            backgroundColor: '#e7d7c9',
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
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
            ItemSeparatorComponent={() => (
              <View style={{height: 10, backgroundColor: 'blue'}}></View>
            )}
            renderItem={({item}) => {
              return (
                <View>
                 {/* {renderTodoItem(item)} */}
                 <ShowTodoList item={item} deleteTodo={(id: number) => deleteTodo (id)}/>
                </View>
              );
            }}></FlatList>
      </View>
    </View>
  );
};

export default TodolistScreen;
