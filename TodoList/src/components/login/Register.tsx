import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {AccountModel} from '../../models/AccountModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {Back} from 'iconsax-react-native';

const Register = () => {
  const navigator: any = useNavigation();

  const route: any = useRoute();
  const {listUser} = route.params;

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [warn, setWarn] = useState('');

  const addUser = async () => {
    try {
      if (userName && fullName && pass && confirmPass) {
        if (pass === confirmPass) {
          const temp1 = listUser;
          const temp = temp1 ? JSON.parse(temp1) : [];
          //console.log(temp1);
          for (var acc of temp) {
            if (acc.userName === userName) {
              setWarn('tai khoan da ton tai');

              return;
            } else {
              setWarn('');
            }
          }
          temp.unshift({
            userName: userName,
            fullName: fullName,
            pass: pass,
          });
          await AsyncStorage.setItem('user', JSON.stringify(temp));
          navigator.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Login',
                  params: {refresh: true},
                },
              ],
            }),
          );
        } else {
          setWarn('khong khop');
        }
      } else {
        setWarn('missing in4');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {/* <Text>{logo}</Text> */}

      {/* <FlatList
              data={linkAPI}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              renderItem={({item}) => <Text>{item.linkAPI}</Text>}
            /> */}
      <View style={{flexDirection: 'row', gap: 16, padding: 16}}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Back size="32" color="#FF8A65" />
        </TouchableOpacity>
        <Text>Register</Text>
      </View>

      <View style={{flexDirection: 'column', gap: 16, padding: 18}}>
        <Text>User Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
          }}
          value={userName}
          onChangeText={text => {
            setUserName(text);
          }}></TextInput>
        <Text>Full Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
          }}
          value={fullName}
          onChangeText={text => {
            setFullName(text);
          }}></TextInput>
        <Text>Password</Text>
        <TextInput
          style={{
            borderWidth: 1,
            color: 'black',
          }}
          value={pass}
          autoCapitalize="none"
          secureTextEntry
          onChangeText={text => {
            setPass(text);
          }}></TextInput>
        <Text>Confirm Password</Text>
        <TextInput
          style={{
            borderWidth: 1,
            color: 'black',
          }}
          value={confirmPass}
          autoCapitalize="none"
          secureTextEntry
          onChangeText={text => {
            setConfirmPass(text);
          }}></TextInput>
        <TouchableOpacity
          style={{backgroundColor: 'green', justifyContent: 'flex-end'}}
          onPress={addUser}>
          <Text>Register</Text>
        </TouchableOpacity>
        <Text style={{color: 'red'}}>{warn}</Text>
      </View>
    </View>
  );
};

export default Register;
