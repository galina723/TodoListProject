import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {FC} from 'react';

interface Props {
  cancelEdit: () => void;
}

const EditTodoList: FC<Props> = props => {
  const {cancelEdit} = props;
  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          flex: 1,
          padding: 10,
        }}
        onChangeText={() => {}}
        placeholder="Add todo"
        value={'contentInput'}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#e7d7c9',
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => {}}>
        <Text
          style={{
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Save
        </Text>
      </TouchableOpacity>
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
