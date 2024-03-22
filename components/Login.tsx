import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';

import InputField from './InputField';

import {Button} from 'react-native-paper';
import {GoogleSignin} from 'react-native-google-signin';

interface LoginScreenProps {
  navigation: any; // You should replace 'any' with the actual type of your navigation object
}
GoogleSignin.configure({
  webClientId:
    '215777421049-mn0rg4oh0lkvnhqjfaup455rui1egmtq.apps.googleusercontent.com',
});
const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const ChangEmail = (email: string) => {
    setEmail(email);
  };
  const ChangePass = (password: string) => {
    setPassword(password);
  };
  const handleEmailLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
  };

  const handleFacebookLogin = async () => {
    navigation.navigate('Home');
  };

  const handleTwitterLogin = async () => {
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/LoginSc.jpg')}
            style={{height: 300, width: 500}}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '800',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

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
          textChange={ChangEmail}
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
          fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => {}}
        />

        <Button mode="contained" onPress={handleEmailLogin} textColor="white">
          {' '}
          Login
        </Button>

        <Text style={{textAlign: 'center', color: '#666', marginVertical: 30}}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={handleGoogleLogin}
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
            onPress={handleFacebookLogin}
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
            onPress={handleTwitterLogin}
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
