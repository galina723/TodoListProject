import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {HomeModel} from '../models/HomeModel';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Login from '../components/login/Login';

const LoginScreen = () => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <Login />
    </View>
  );
};

export default LoginScreen;
