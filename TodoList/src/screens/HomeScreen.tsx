import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {HomeModel} from '../models/HomeModel';
import axios from 'axios';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';

const HomeScreen = () => {
  const navigator: any = useNavigation();

  const [fact, setFact] = useState<HomeModel[]>([]);
  const [content, setContent] = useState('');

  const [people, setPeople] = useState<string>('');
  const getLoggedUser = async () => {
    const user = await AsyncStorage.getItem('loggedUser');
    if (user) {
      const user1 = JSON.parse(user);
      setPeople(user1.userName);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedUser');
    navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      }),
    );
  };

  useEffect(() => {
    getLoggedUser();
  }, []);
  return (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{people}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
