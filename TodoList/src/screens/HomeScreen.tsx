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
import {Data} from 'iconsax-react-native';
import {Database} from '../helpers/database';
import {handleLink} from '../helpers/LinkConfig';

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

      const user2 = user1.fullName.split(' ');

      const user3 = user2[user2.length - 1];
      const user4 = user3[0].toUpperCase();
      //console.log(user4);

      //console.log(user2);
      setPeople(user4);
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
        //console.log(res.data);
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
    show();
  }, []);

  const show = async () => {
    const result = await Database.selectTable('user');
    //console.log(result);
  };

  const deletee = async () => {
    const result = await Database.deleteTable('user', 'WHERE userName = "6"');
    console.log(result);
  };

  const renderWeather = useCallback(() => {
    if (weatherData) {
      //console.log(weatherData.current.condition.icon);
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#c6c5ca',
            marginHorizontal: 10,
            padding: 10,
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

  const handleNavigate = async (isTodo: boolean) => {
    var url = '';
    if (isTodo) {
      url = `exp://app/tabnavigator/todolist/todolistscreen/${false}`;
    } else {
      url = `exp://app/tabnavigator/note/notescreen/${false}`;
    }
    await handleLink(url);
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View
          style={[
            styles.hhhh,
            // styles.image,
            {borderRadius: 58, height: 40, width: 40},
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: 'black',
            }}>
            {people}
          </Text>
        </View>

        <TouchableOpacity
          onPress={logout}
          style={{padding: 10, borderRadius: 10, backgroundColor: '#f5d7cd'}}>
          <Text>Log out</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={deletee} style={{padding: 10}}>
          <Text>fffff out</Text>
        </TouchableOpacity> */}
      </View>

      {renderWeather()}

      <View
        style={{
          flex: 1,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => handleNavigate(true)}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>TodoList</Text>
          <View>
            <Text>Total todolist:</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate(false)}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Note</Text>
          <View>
            <Text>Total note:</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hhhh: {
    backgroundColor: '#e8dcf4',
    //borderWidth: 1,
  },
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
