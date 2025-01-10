import {View, Text} from 'react-native';
import React, {useState} from 'react';

import {NoteModel} from '../models/NoteModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteScreen = () => {
  const [note, setNote] = useState<NoteModel[]>([]);
  const [contentInput, setContentInput] = useState<string>('');

  return (
    <View>
      <Text>NoteScreen</Text>
    </View>
  );
};

export default NoteScreen;
