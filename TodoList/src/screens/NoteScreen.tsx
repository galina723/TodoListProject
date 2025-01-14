import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowNote from '../components/note/ShowNote';
import {NoteModel} from '../models/NoteModel';
import {Add} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const NoteScreen = () => {
  const navigator: any = useNavigation();

  const route: any = useRoute();
  const {refresh} = route.params;

  const [note, setNote] = useState<NoteModel[]>([]);
  const [contentInput, setContentInput] = useState<string>('');

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
    } catch (error) {
      console.error('Error clearing all notes:', error);
    }
  };

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
          onChangeText={setContentInput}
          placeholder="Add Note"
        />
        <TouchableOpacity
          onPress={addNote}
          style={{backgroundColor: '#e7d7c9', padding: 10, borderRadius: 8}}>
          <Text>Add</Text>
        </TouchableOpacity>
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
          <ShowNote item={item} removeSingleNote={removeSingleNote} />
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
