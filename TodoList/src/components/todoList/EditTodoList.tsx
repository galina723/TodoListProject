import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {TodoListModel} from '../../models/TodoModel';
import {CloseCircle, Save2} from 'iconsax-react-native';

interface Props {
  item: TodoListModel;
  cancelEdit: () => void;
  saveEdit: (id: number, content: string) => void;
}

const EditTodoList: FC<Props> = props => {
  const {cancelEdit, item, saveEdit} = props;
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    if (item) {
      setNewContent(item.content);
    }
  }, [item]);
  const saveData = () => {
    if (newContent) {
      saveEdit(item.id, newContent);
      cancelEdit();
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#e7d7c9',
        padding: 4,
      }}>
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          flex: 1,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onChangeText={text => setNewContent(text)}
        placeholder="Add todo"
        value={newContent}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 23,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
          }}
          onPress={() => {
            saveData();
          }}>
          <Save2 size="24" color="#555555" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            cancelEdit();
          }}>
          <CloseCircle size="24" color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditTodoList;
