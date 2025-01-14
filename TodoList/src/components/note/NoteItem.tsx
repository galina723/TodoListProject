import React, {FC} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {NoteModel} from '../../models/NoteModel';
import {Edit, Trash} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  item: NoteModel;
  removeSingleNote(id: number): void;
  editNote(): void;
}

const NoteItem: FC<Props> = ({item, removeSingleNote, editNote}) => {
  const navigator: any = useNavigation();
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
        gap: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
      }}>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 10,
          flexDirection: 'row',
          flex: 1,
          gap: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigator.navigate('NoteDetail', {
            id: item.id,
            content: item.content,
          });
        }}>
        <Text
          style={{
            fontSize: 16,
            padding: 2,
            flex: 1,
          }}>
          {item.content}
        </Text>
        <View
          style={{flexDirection: 'row', gap: 10, justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={editNote}>
            <Edit size="20" color="orange" />
          </TouchableOpacity>
          <TouchableOpacity onPress={showAlert}>
            <Trash size="20" color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NoteItem;
