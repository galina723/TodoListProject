import {View, Text} from 'react-native';
import React, {useState} from 'react';

import {NoteModel} from '../models/NoteModel';

const NoteScreen = () => {
  const [note, setNote] = useState<NoteModel[]>([]);
  const [noteList, setNoteList] = useState<string[]>([]);

  return (
    <View>
      <Text>NoteScreen</Text>
    </View>
  );
};

export default NoteScreen;
