import React, {FC, useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {Save2, CloseCircle} from 'iconsax-react-native';
import {NoteModel} from '../../models/NoteModel';

interface Props {
  item: NoteModel;
  toggleEdit(): void;
}

const EditNote: FC<Props> = props => {
  const {item, toggleEdit} = props;
  const [newContent, setNewContent] = useState(item.content);
  const [newTitle, setNewTitle] = useState(item.title);

  const saveEdit = () => {
    if (newTitle && newContent) {
      item.content = newContent;
      item.title = newTitle;
      toggleEdit();
    }
  };

  useEffect(() => {
    if (item) {
      setNewContent(item.content);
      setNewTitle(item.title);
    }
  }, [item]);

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
