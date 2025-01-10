import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {TodoListModel} from '../../models/TodoModel';
import {Save2} from 'iconsax-react-native';

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
    saveEdit(item.id, newContent);
    cancelEdit();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          flex: 1,
          padding: 10,
        }}
        onChangeText={text => setNewContent(text)}
        placeholder="Add todo"
        value={newContent}
      />
      {/* <TouchableOpacity
        style={{
          backgroundColor: '#e7d7c9',
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => {
          saveData();
        }}>
        <Text
          style={{
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Save
        </Text>
      </TouchableOpacity> */}
      <Save2
        size="24"
        color="#555555"
        onPress={() => {
          saveData();
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#e7d7c9',
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => {
          cancelEdit();
        }}>
        <Text
          style={{
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditTodoList;
