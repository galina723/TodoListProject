import {View, Text, TouchableOpacity} from 'react-native';
import React, { FC } from 'react';
import { TodoListModel } from '../../models/TodoModel';

interface Props{
    item: TodoListModel; 
    deleteTodo: (id : number) => void; 
}

const ShowTodoList : FC <Props> = (props) => {
    const {item, deleteTodo} = props;


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
};

export default ShowTodoList;
