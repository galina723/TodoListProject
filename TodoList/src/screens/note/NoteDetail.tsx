import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Edit2, Trash} from 'iconsax-react-native';

const NoteDetail = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {id, content, title} = route.params;

  return (
    <View style={{flex: 1, padding: 10}}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 10,
          marginTop: 10,
          textAlign: 'center',
          color: 'black',
        }}>
        {title}
      </Text>
      <ScrollView>
        <Text style={{fontSize: 20, color: 'black'}}>{content}</Text>
      </ScrollView>

      {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditNote', {id, content, title})}>
          <Edit2 size="24" color="#FF8A65" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Trash size="24" color="#FF8A65" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default NoteDetail;
