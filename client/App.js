import React from 'react'
import {View,Text,Button,PermissionsAndroid} from 'react-native'
import { GoogleSignin, GoogleSigninButton,statusCodes } from 'react-native-google-signin';
import { LoginButton, AccessToken,LoginManager } from 'react-native-fbsdk';
import Geolocation from 'react-native-geolocation-service';

//keytool -list -v -keystore my-upload-key.keystore -alias my-key-alias -storepass neenasharma -keypass neenasharma
//this is used to generate sha1 keys

//have to turn on the google auth otion from firebase 



class Home extends React.Component{ 
  
  componentDidMount(){
    this.askPermission()
    Geolocation.getCurrentPosition(
      (position) => {
          (position);
      },
      (error) => {
          // See error code charts below.
          (error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
    GoogleSignin.configure({
      webClientId:'976851306840-uvre4r8d777phobssau7chn8nm2mts9h.apps.googleusercontent.com',
      offlineAccess:false
    });

  }

  state={ isSigninInProgress:false,userInfo:null}
  _signIn= async ()=>{
    
    try {
      const avail=await GoogleSignin.hasPlayServices();
      (avail)
      const userInfo = await GoogleSignin.signIn();
      (userInfo)
      this.setState({ userInfo });
    } 
    catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        ('there is some other',error)
      }
    }
  }
  logOut=async ()=>{
    try {
      await GoogleSignin.revokeAccess();
      const m=await GoogleSignin.signOut();
      (m)
      this.setState({ userInfo: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      .error(error);
    }

  }
  askPermission=async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ('You can use the camera');
      } else {
        ('Camera permission denied');
      }
    } catch (err) {
      .warn(err);
    }
  }
  render() {
    (this.state)
    return(
      <View>
        <GoogleSigninButton
      style={{ width: 200, height: 100 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={this._signIn}
      disabled={this.state.isSigninInProgress} />
      <Button title='logout' onPress={thisOut} ></Button>
      </View>
    )
  }

}
export default Home