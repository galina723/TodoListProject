import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HomeModel} from '../models/HomeModel';
import axios from 'axios';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';
import GetLocation from 'react-native-get-location';

interface LocationModel {
  latitude: number;
  longtitude: number;
}

const HomeScreen = () => {
  const navigator: any = useNavigation();
  const [weatherData, setWeatherData] = useState<HomeModel>();

  const [people, setPeople] = useState<string>('');

  const [location, setLocation] = useState<LocationModel>();
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

  const handlePermission = async () => {
    const locationGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (locationGranted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Đã được cấp quyền LOCATION');
    } else {
      console.log('Yêu cầu quyền LOCATION bị từ chối');
      Alert.alert('Thông báo', 'Vui lòng cấp quyền vị trí để tiếp tục.');
    }
  };

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setLocation({
          latitude: location.latitude,
          longtitude: location.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  useEffect(() => {
    if (location) {
      getWeather(location);
    }
  }, [location]);

  const getWeather = async (location: LocationModel) => {
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=91270fa644fc4ada9fc84220212112&q=${location.latitude},${location.longtitude}&aqi=no`;

      const res = await axios.get(url);
      if (res.status === 200) {
        setWeatherData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoggedUser();
    handlePermission();
    getLocation();
  }, []);

  const renderWeather = useCallback(() => {
    if (weatherData) {
      //console.log(weatherData.current.condition.icon);
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={{uri: 'https:' + weatherData?.current.condition.icon}}
            style={styles.image}
          />
          <Text style={styles.text}>{weatherData.current.temp_c}</Text>
        </View>
      );
    }
  }, [weatherData]);

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>{people}</Text>

        <TouchableOpacity onPress={logout} style={{padding: 10}}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>

      {renderWeather()}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
