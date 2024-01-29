import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Auth from './Auth';
import FbAuth from './FbAuth';
import * as AppleAuthentication from 'expo-apple-authentication'

export default function App() {
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(true);
  const [userToken, setUserToken] = useState();
  console.log("hi");
  const [token, setToken] = useState('')
  const [rtoken, setRToken] = useState('')
  const login = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });
      setUserToken(credential);
      getTrt(credential);
    } catch (e) {
      console.log(e);
    }
  }
  const getTrt = async (ctoken) => {
    console.log(ctoken);
    const response = await fetch('http://192.168.1.102:8080/api/register/3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ctoken),
    });

    if (response.ok) {
      const responseData = await response.json();
      setToken(responseData.access_token);
      setRToken(responseData.refresh_token);

    } else {
      console.log('different response: not okay:', response);
    }
  };
  useEffect(() => {
    console.log('token: ', token);
    console.log('refresh token: ', rtoken);
  }, [token, rtoken]);
  const logout = async () => {
    setUserToken(undefined);
  };


  const getAppleAuthContent = () => {
    if (!userToken) {
      return <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={login}
      />
    } else {
      return (
        <Button style={styles.button} title="Sign Out" onPress={logout}>

        </Button>
      )

    }
  };
  return (
    <View style={styles.container}>

      <View style={{
        flexDirection: 'column',
      }}>
        {appleAuthAvailable

          ? getAppleAuthContent()
          : <Text>Not available for android!</Text>
        }
        <FbAuth />
        <Auth></Auth>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',

  },
  button: {
    width: 200,
    height: 64
  }
});
