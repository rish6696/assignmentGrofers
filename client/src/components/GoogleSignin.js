import React from 'react'
import { GoogleSignin, GoogleSigninButton,statusCodes } from 'react-native-google-signin';

import {View,Text,StyleSheet} from 'react-native'
import { connect } from 'react-redux'


import action from '../actions'


class GoogleSignIn extends React.Component {
    
    state={
        userInfo:null,isSigninInProgress:false
    }
    componentDidMount=()=>{
      GoogleSignin.configure({
        webClientId:'976851306840-uvre4r8d777phobssau7chn8nm2mts9h.apps.googleusercontent.com',
        offlineAccess:false
      });
       
    }
    _signIn=()=>{
          this.props.performGoogleLogin(GoogleSignin,statusCodes,this.props.navigation)
      }
      logOut=async ()=>{
        try {
          await GoogleSignin.revokeAccess();
          const m=await GoogleSignin.signOut();
          this.setState({ userInfo: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          
        }
    
      }
      render(){
          return(
            <GoogleSigninButton
            style={styles.googleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress} />
          )
      }


}
const styles=StyleSheet.create({
    googleButton:{
        height:50,
        width:250
    }
})
const mapStateToProps=(state)=>{
  return {
    state
  }
}

const mapActionToProps={
  performGoogleLogin:action.GoogleSignIn
}
export default connect(mapStateToProps,mapActionToProps)(GoogleSignIn)