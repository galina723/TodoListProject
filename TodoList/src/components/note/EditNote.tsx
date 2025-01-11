import React, {FC, useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {Save2, CloseCircle} from 'iconsax-react-native';
import {NoteModel} from '../../models/NoteModel';

interface Props {
  item: NoteModel;
  toggleEdit(): void;
}

const EditNote: FC<Props> = ({item, toggleEdit}) => {
  const [newContent, setNewContent] = useState(item.content);

  const saveEdit = () => {
    if (newContent) {
      item.content = newContent;
    }
  };

  return (
    <View style={{flexDirection: 'column', gap: 10}}>
      <TextInput
        value={newContent}
        onChangeText={setNewContent}
        placeholder="Edit Note"
        style={{backgroundColor: 'white', borderRadius: 10}}
      />
      <View style={{flexDirection: 'row', gap: 10, justifyContent: 'flex-end'}}>
        <TouchableOpacity onPress={saveEdit}>
          <Save2 size="24" color="#FF8A65" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleEdit}>
          <CloseCircle size="24" color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditNote;
