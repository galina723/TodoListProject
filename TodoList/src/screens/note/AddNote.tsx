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
    <View style={{flexDirection: 'column', gap: 10}}>
      <Text>Title</Text>
      <TextInput
        style={{backgroundColor: 'white', borderRadius: 10}}
        onChangeText={handle1}
        value={titleInput}></TextInput>

      <Text>Content</Text>
      <TextInput
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          height: 500,
          textAlignVertical: 'top',
        }}
        onChangeText={handle}
        value={contentInput}
        multiline></TextInput>

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
