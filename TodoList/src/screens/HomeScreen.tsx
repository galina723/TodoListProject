import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {HomeModel} from '../models/HomeModel';
import axios from 'axios';

const HomeScreen = () => {
  const [fact, setFact] = useState<HomeModel>();
  const [content, setContent] = useState('');

  const getFact = async () => {
    try {
      const temp = await axios.get('https://catfact.ninja/fact');
      // console.log(temp);
      if (temp.status === 200) {
        setContent(temp.data.fact);
        setFact(temp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFact();
  }, []);

  return <Text>{content}</Text>;
};

export default HomeScreen;
