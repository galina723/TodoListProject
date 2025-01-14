import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';

const TodoListDetail = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {id, content} = route.params;
  // console.log(id);

  return (
    <View style={{flex: 1}}>
      <Text>{content}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'TodolistScreen',
                  //  params: {user: 'jane', key: route.params.key},
                },
              ],
            }),
          );
        }}>
        <Text>huhuh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoListDetail;
