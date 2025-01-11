import React, {FC} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {NoteModel} from '../../models/NoteModel';
import {Edit, Trash} from 'iconsax-react-native';

interface Props {
  item: NoteModel;
  removeSingleNote(id: number): void;
  editNote(): void;
}

const NoteItem: FC<Props> = ({item, removeSingleNote, editNote}) => {
  const showAlert = () => {
    Alert.alert('Delete Note', 'Are you sure?', [
      {text: 'Cancel'},
      {text: 'OK', onPress: () => removeSingleNote(item.id)},
    ]);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <Text>{item.content}</Text>
      <View style={{flexDirection: 'row', gap: 10}}>
        <TouchableOpacity onPress={editNote}>
          <Edit size="20" color="orange" />
        </TouchableOpacity>
        <TouchableOpacity onPress={showAlert}>
          <Trash size="20" color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteItem;
