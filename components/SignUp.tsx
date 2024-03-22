import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import firebase from '@react-native-firebase/app';
import InputField from './InputField';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {Button} from 'react-native-paper';
import {GoogleSignin} from 'react-native-google-signin';
GoogleSignin.configure({
  webClientId:
    '215777421049-mn0rg4oh0lkvnhqjfaup455rui1egmtq.apps.googleusercontent.com',
});
interface RegisterScreenProps {
  navigation: any; // Replace 'any' with the actual type of your navigation object
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const ChangeName = (name: string) => {
    setName(name);
  };
  const ChangeEmail = (email: string) => {
    setEmail(email);
  };
  const ChangePass = (password: string) => {
    setPassword(password);
  };
  const ChangeConfirmPass = (password: string) => {
    setConfirmPass(password);
  };

  function onAuthStateChanged(user: any) {
    console.log('auth changed', user);
    if (user) {
      navigation.navigate('Home');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleEmailRegisteration = async () => {
    try {
      // Create user with email and password
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const db = database();
      const userref = db.ref('users');
      userref.child(user.uid).push({
        Username: name,
        email,
        dob: date,
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleRegisteration = async () => {
    navigation.navigate('Home');
  };

  const handleFacebookRegisteration = async () => {
    navigation.navigate('Home');
  };

  const handleTwitterRegisteration = async () => {
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/Register.jpg')}
            style={{height: 400, width: 500}}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={handleGoogleRegisteration}
            style={{
              borderColor: '#EA4335',
              borderWidth: 2,
              borderRadius: 100,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <AntDesign name="google" size={25} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFacebookRegisteration}
            style={{
              borderColor: '#1877f2',
              borderWidth: 2,
              borderRadius: 100,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <AntDesign name="facebook-square" size={25} color="#1877f2" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleTwitterRegisteration}
            style={{
              borderColor: '#55acee',
              borderWidth: 2,
              borderRadius: 100,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <AntDesign name="twitter" size={25} color="#55acee" />
          </TouchableOpacity>
        </View>

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, register with email ...
        </Text>

        <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          textChange={ChangeName}
        />

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          textChange={ChangeEmail}
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          textChange={ChangePass}
          inputType="password"
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          textChange={ChangeConfirmPass}
          inputType="password"
        />

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date('2005-01-01')}
          minimumDate={new Date('1980-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <Button
          onPress={handleEmailRegisteration}
          mode="contained"
          textColor="white">
          {' '}
          Register
        </Button>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: '#AD40AF',
                fontWeight: '700',
                marginHorizontal: 5,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
