import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {NoteModel} from '../../models/NoteModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import {Add} from 'iconsax-react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Database} from '../../helpers/database';
import Snackbar from 'react-native-snackbar';

const AddNote = () => {
  const navigator: any = useNavigation();

  const [note, setNote] = useState<NoteModel[]>([]);
  const [contentInput, setContentInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');

  const addNote = async () => {
    try {
      const temp = await AsyncStorage.getItem('note');
      const parsedNote = temp ? JSON.parse(temp) : [];
      if (contentInput) {
        const id = Math.random();

        parsedNote.unshift({
          id,
          title: titleInput,
          content: contentInput,
          status: false,
        });
        const data1 = [id.toString(), titleInput, contentInput, false];
        await insertNoteToDB(data1);
        await AsyncStorage.setItem('note', JSON.stringify(parsedNote));
        setContentInput('');
        setTitleInput('');

        navigator.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'NoteScreen',
                params: {refresh: true},
              },
            ],
          }),
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const insertNoteToDB = async (data: any[]) => {
    const result = await Database.insertTable(
      'note',
      data,
      'id, title, content, status',
    );
    console.log(result);
  };

  const handle = (text: string) => {
    setContentInput(text);
  };

  const handle1 = (text: string) => {
    setTitleInput(text);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        padding: 16,
        gap: 16,
        flex: 1,
      }}>
      <TextInput
        placeholder="Enter your title"
        style={{backgroundColor: 'transparent'}}
        autoFocus
        onChangeText={handle1}
        value={titleInput}></TextInput>
      <TextInput
        style={{
          backgroundColor: 'transparent',
          height: 500,
          textAlignVertical: 'top',
        }}
        placeholder="Enter your content"
        onChangeText={handle}
        value={contentInput}
        multiline></TextInput>

      <TouchableOpacity
        onPress={addNote}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          borderRadius: 50,
          backgroundColor: '#e7d7c9',
          padding: 10,
        }}>
        <Add size="24" color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default AddNote;
