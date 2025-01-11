import {View} from 'react-native';
import React, {FC, useState} from 'react';
import {NoteModel} from '../../models/NoteModel';
import EditNote from './EditNote';
import NoteItem from './NoteItem';

interface Props {
  item: NoteModel;
  removeSingleNote: (id: number) => void;
  editNote: (id: number, content: string) => void;
}

const ShowNote: FC<Props> = props => {
  const {item, removeSingleNote, editNote} = props;

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return isEditing ? (
    <EditNote item={item} saveEdit={editNote} toggleEdit={toggleEdit} />
  ) : (
    <NoteItem
      item={item}
      removeSingleNote={removeSingleNote}
      editNote={toggleEdit}
    />
  );
};

export default ShowNote;
