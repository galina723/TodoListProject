import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {AccountModel} from '../../models/AccountModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../LoadingScreen';

const Login = () => {
  const navigator: any = useNavigation();
  const [user, setUser] = useState<string>('');
  const route: any = useRoute();

  const {refresh} = route.params;

  // const [linkAPI, setLinkAPI] = useState<ListCompanyModel[]>([]);
  // const [loginAPI, setLoginAPI] = useState<string>('');
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(true);

  const [account, setAccount] = useState<AccountModel[]>([]);

  const [warn, setWarn] = useState('');

  const checkLogged = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('loggedUser');
    if (user) {
      navigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Tab',
            },
          ],
        }),
      );
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogged();
  }, []);

  const handleLogin = async () => {
    setWarn('');
    if (userName && pass) {
      if (user) {
        const temp = JSON.parse(user);

        for (var acc of temp) {
          if (acc.userName === userName && acc.pass === pass) {
            await AsyncStorage.setItem('loggedUser', JSON.stringify(acc));

            navigator.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'Tab',
                  },
                ],
              }),
            );
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [refresh]);
  const getUser = async () => {
    const temp1 = await AsyncStorage.getItem('user');
    temp1 ? setUser(temp1) : setUser('');
  };
  return (
    <View>
      {loading ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'green',

              height: 64,
              //padding: 16,
            }}>
            <Text style={{color: 'white', fontSize: 22}}>Login</Text>
          </View>
          <View style={{flexDirection: 'column', gap: 16, padding: 18}}>
            <Text>
              Username <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                backgroundColor: 'white',
              }}
              value={userName}
              onChangeText={text => {
                setUserName(text);
              }}
              placeholder="Enter your username"></TextInput>
            <Text>
              Password <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                color: 'black',
                backgroundColor: 'white',
              }}
              value={pass}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={text => {
                setPass(text);
              }}
              placeholder="Enter your password"></TextInput>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: 2, // Optional padding for spacing from the edges
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  marginRight: 8, // Space between the buttons
                }}
                onPress={handleLogin}>
                <Text style={{color: 'white', fontSize: 16}}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#e7d7c9',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                }}
                onPress={() =>
                  navigator.navigate('Register', {listUser: user})
                }>
                <Text style={{color: '#000', fontSize: 16}}>
                  Create a new account
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{color: 'red'}}>{warn}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Login;
