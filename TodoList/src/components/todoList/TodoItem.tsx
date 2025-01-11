import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {FC} from 'react';
import {TodoListModel} from '../../models/TodoModel';
import {Edit, Minus, Trash} from 'iconsax-react-native';

interface Props {
  item: TodoListModel;
  deleteTodo: (id: number) => void;
  doneTodo: (id: number) => void;
  editTodo: (id: number) => void;
}

const TodoItem: FC<Props> = props => {
  const {item, deleteTodo, doneTodo, editTodo} = props;
  const showAlert = () => {
    Alert.alert('Delete TodoList', 'R u sure?', [
      {
        text: 'Ok',
        onPress: () => {
          deleteTodo(item.id);
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };
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
          padding: 10,
          borderRadius: 10,
          flexDirection: 'row',
          flex: 1,
          gap: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textDecorationLine: item.status ? 'line-through' : 'none',
            fontSize: 16,
            padding: 2,
            flex: 1,
          }}>
          {item.content}
        </Text>
        <View
          style={{
            gap: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => editTodo(item.id)}>
            <Edit size="20" color="orange" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => showAlert()}>
            <Trash size="20" color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;
