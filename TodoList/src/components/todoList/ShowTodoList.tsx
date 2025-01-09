import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import {TodoListModel} from '../../models/TodoModel';
import {TextInput} from 'react-native-gesture-handler';
import TodoItem from './TodoItem';
import EditTodoList from './EditTodoList';

interface Props {
  item: TodoListModel;
  deleteTodo: (id: number) => void;
  doneTodo: (id: number) => void;
  editTodo: (id: number) => void;
}

const ShowTodoList: FC<Props> = props => {
  const {item, deleteTodo, doneTodo, editTodo} = props;

  const [status, setStatus] = useState(false);

  const changeStatus = () => {
    setStatus(!status);
  };

  return status ? (
    <EditTodoList cancelEdit={changeStatus} />
  ) : (
    <TodoItem
      deleteTodo={deleteTodo}
      doneTodo={doneTodo}
      editTodo={changeStatus}
      item={item}
    />
  );
};

export default ShowTodoList;
