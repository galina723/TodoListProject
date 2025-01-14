import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const NoteDetail = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {id, content} = route.params;

  return (
    <View>
      <Text>{content}</Text>
      {/* <TouchableOpacity >
        <Text>return</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default NoteDetail;
