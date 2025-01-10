import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import {TodoListModel} from '../../models/TodoModel';
import TodoItem from './TodoItem';
import EditTodoList from './EditTodoList';

interface Props {
  item: TodoListModel;
  deleteTodo: (id: number) => void;
  doneTodo: (id: number) => void;
  editTodo: (id: number, content: string) => void;
}

const ShowTodoList: FC<Props> = props => {
  const {item, deleteTodo, doneTodo, editTodo} = props;

  const [status, setStatus] = useState(false);

  const changeStatus = () => {
    setStatus(!status);
  };

  return status ? (
    <EditTodoList cancelEdit={changeStatus} item={item} saveEdit={editTodo} />
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
