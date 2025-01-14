import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {NoteModel} from '../../models/NoteModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import {Add} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

const AddNote = () => {
  const navigator: any = useNavigation();

  const [note, setNote] = useState<NoteModel[]>([]);
  const [contentInput, setContentInput] = useState<string>('');

  const addNote = async () => {
    try {
      const temp = note;
      temp.unshift({
        id: Math.random(),
        content: contentInput,
      });
      await AsyncStorage.setItem('note', JSON.stringify(temp));
      setContentInput('');
      navigator.replace('NoteScreen', {refresh: true});
    } catch (error) {
      console.log(error);
    }
  };

  const handle = (text: string) => {
    setContentInput(text);
  };

  return (
    <View style={{flexDirection: 'column', gap: 10}}>
      <TextInput
        style={{backgroundColor: 'white', borderRadius: 10}}
        onChangeText={handle}
        value={contentInput}></TextInput>

      <View style={{flexDirection: 'row', gap: 10, justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={addNote}
          style={{
            alignSelf: 'flex-end',
            padding: 10,
            borderRadius: 40,
            backgroundColor: 'orange',
          }}>
          <Add size="24" color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNote;
