import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {TodoListModel} from '../../models/TodoModel';

interface Props {
  item: TodoListModel;
  deleteTodo: (id: number) => void;
  doneTodo: (id: number) => void;
  editTodo: (id: number) => void;
}

const TodoItem: FC<Props> = props => {
  const {item, deleteTodo, doneTodo, editTodo} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
      }}>
      <TouchableOpacity
        onPress={() => doneTodo(item.id)}
        style={{
          backgroundColor: item.status ? 'green' : 'red',
          padding: 10,
          borderRadius: 10,
          flexDirection: 'row',
          flex: 1,
        }}>
        <Text style={{fontSize: 20, padding: 2, flex: 1}}>{item.content}</Text>
        <View style={{gap: 3, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              alignSelf: 'flex-start',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => editTodo(item.id)}>
            <Text
              style={{
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
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
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;
