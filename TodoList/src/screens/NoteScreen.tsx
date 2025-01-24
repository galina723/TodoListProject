import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NoteModel} from '../models/NoteModel';
import {Add} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDebounce} from '../hook/UseDebounce';
import NoteItem from '../components/note/NoteItem';
import Snackbar from 'react-native-snackbar';

const NoteScreen = () => {
  const navigator: any = useNavigation();

  const route: any = useRoute();
  const {refresh} = route.params;

  const [note, setNote] = useState<NoteModel[]>([]);
  const [contentInput, setContentInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');
  const [controlText, setControlText] = useState(true);

  const handleDebounce = useDebounce(contentInput, 500);

  useEffect(() => {
    handleSearch(handleDebounce);
  }, [handleDebounce]);

  const handleSearch = async (text: string) => {
    const temp = await AsyncStorage.getItem('note');
    if (temp) {
      const temp1 = JSON.parse(temp);
      if (text) {
        const temp2 = temp1.filter((item: NoteModel) =>
          item.content.includes(text),
        );
        setNote(temp2);
      } else {
        setNote(temp1);
      }
    }
  };

  //console.log(handleDebounce);

  const handleText = (text: string) => {
    setContentInput(text);
    setControlText(!text);
  };

  const handleContent = () => {
    setContentInput('');
    setControlText(true);
  };

  useEffect(() => {
    getNote();
  }, [refresh]);

  const addNote = async () => {
    try {
      const temp = note;
      if (contentInput) {
        temp.unshift({
          id: Math.random(),
          content: contentInput,
          title: '',
        });
        await AsyncStorage.setItem('note', JSON.stringify(temp));
        setContentInput('');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getNote = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('note');
      if (storedNotes) {
        setNote(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error retrieving notes:', error);
    }
  };

  const removeSingleNote = async (id: number) => {
    try {
      const updatedNotes = note.filter(n => n.id !== id);
      await AsyncStorage.setItem('note', JSON.stringify(updatedNotes));
      setNote(updatedNotes);
    } catch (error) {
      console.error('Error removing note:', error);
    }
  };

  const removeAllData = async () => {
    try {
      await AsyncStorage.removeItem('note');
      setNote([]);
      console.log(44444);
      Snackbar.show({
        text: 'Hello world',
        duration: Snackbar.LENGTH_SHORT,
      });
    } catch (error) {
      console.error('Error clearing all notes:', error);
    }
  };

  const editNote = async (id: number, title: string, content: string) => {
    try {
      let temp = note.map(idd => {
        return idd.id === id
          ? {
              ...idd,
              title: title,
              content: content,
            }
          : idd;
      });
      // console.log(id, content);
      await AsyncStorage.setItem('note', JSON.stringify(temp));
      setNote(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const saveNewData = async (id: number) => {
    let temp = note.map(idd => {
      return idd.id == id
        ? {
            ...idd,
            title: titleInput,
            content: contentInput,
          }
        : idd;
    });
    await AsyncStorage.setItem('note', JSON.stringify(temp));
    setNote(temp);
  };

  //console.log(controlText);

  return (
    <View style={{flex: 1, padding: 10, gap: 10}}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: 'white',
            color: 'black',
            borderRadius: 8,
            padding: 10,
          }}
          value={contentInput}
          onChangeText={content => handleText(content)}
          placeholder="Search..."
        />
        {!controlText ? (
          <TouchableOpacity
            style={{padding: 10, borderRadius: 8}}
            onPress={handleContent}>
            <Text>X</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <TouchableOpacity
          onPress={removeAllData}
          style={{backgroundColor: '#e7d7c9', padding: 10, borderRadius: 8}}>
          <Text>Clear All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={note}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        renderItem={({item}) => (
          <NoteItem
            item={item}
            removeSingleNote={removeSingleNote}
            editNote={editNote}
          />
        )}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          borderRadius: 50,
          backgroundColor: '#e7d7c9',
          padding: 10,
        }}
        onPress={() => navigator.navigate('AddNote')}>
        <Add size="32" color="#FF8A65" />
      </TouchableOpacity>
    </View>
  );
};

export default NoteScreen;
