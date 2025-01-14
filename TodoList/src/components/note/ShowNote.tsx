import React, {FC, useState} from 'react';
import {NoteModel} from '../../models/NoteModel';
import EditNote from './EditNote';
import NoteItem from './NoteItem';

interface Props {
  item: NoteModel;
  removeSingleNote: (id: number) => void;
}

const ShowNote: FC<Props> = ({item, removeSingleNote}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return isEditing ? (
    <EditNote item={item} toggleEdit={toggleEdit} />
  ) : (
    <NoteItem
      item={item}
      removeSingleNote={removeSingleNote}
      editNote={toggleEdit}
    />
  );
};

export default ShowNote;
