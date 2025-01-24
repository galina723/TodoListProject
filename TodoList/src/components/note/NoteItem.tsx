import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {NoteModel} from '../../models/NoteModel';
import {Edit, Save2, Trash} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';

interface Props {
  item: NoteModel;
  removeSingleNote(id: number): void;
  editNote(id: number, title: string, content: string): void;
}

const NoteItem: FC<Props> = ({item, removeSingleNote, editNote}) => {
  const navigator: any = useNavigation();
  const [newContent, setNewContent] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const showAlert = () => {
    Alert.alert('Delete Note', 'Are you sure?', [
      {text: 'Cancel'},
      {text: 'OK', onPress: () => removeSingleNote(item.id)},
    ]);
  };

  //console.log(newContent);

  useEffect(() => {
    if (item) {
      setNewContent(item.content);
      setNewTitle(item.title);
    }
  }, [item]);

  const saveEdit = () => {
    if (newTitle && newContent) {
      item.content = newContent;
      item.title = newTitle;
      setNewContent(item.content);
      setNewTitle(item.title);
      editNote(item.id, item.title, item.content);

      //toggleEdit();
    }
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
            title: item.title,
          });
        }}>
        <Text
          style={{
            fontSize: 16,
            padding: 2,
            flex: 1,
          }}>
          {item.title}
        </Text>
        <View
          style={{flexDirection: 'row', gap: 10, justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Edit size="20" color="orange" />
          </TouchableOpacity>
          <TouchableOpacity onPress={showAlert}>
            <Trash size="20" color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Edit Note
            </Text>
            <View style={{gap: 10, justifyContent: 'flex-start'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Title</Text>
              <TextInput
                value={newTitle}
                onChangeText={item => setNewTitle(item)}
                style={{padding: 10, backgroundColor: '#e0e0e0'}}></TextInput>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Content</Text>
              <ScrollView>
                <TextInput
                  multiline
                  value={newContent}
                  onChangeText={item => setNewContent(item)}
                  style={{
                    height: 160,
                    backgroundColor: '#e0e0e0',
                    borderRadius: 10,
                    textAlignVertical: 'top',
                  }}></TextInput>
              </ScrollView>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  saveEdit();
                }}>
                <Save2 size="24" color="#FF8A65" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 400,
    width: 300,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 10,
  },
});

export default NoteItem;
