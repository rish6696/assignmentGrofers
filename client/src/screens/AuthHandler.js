import React from 'react'
import {View,Text,Button,Image,StyleSheet,ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../constants'

import  GoogleSignin from "../components/GoogleSignin";

class Component extends React.Component {
    state={
        userInfo:null,isSigninInProgress:true  //it is mainly token fetching progress
    }
    async componentDidMount(){
        const CURRENT_USER=await AsyncStorage.getItem(Constants.CURRENT_USER)
        this.setState({isSigninInProgress:false})
        if(CURRENT_USER){
            this.props.navigation.navigate('mainFlow');
        }
    }

    render(){
        if(!this.state.isSigninInProgress){
            return(
               <View style={styles.container}>
                <Text style={styles.title}>Grofers Assignment</Text>
                <GoogleSignin navigation={this.props.navigation}></GoogleSignin>               
              </View>
            )
        }else{
            return(
                <ActivityIndicator size='large' ></ActivityIndicator>
            )
        }
    }
 }
 const styles=StyleSheet.create({
     subtitle:{
         fontSize:10,
         color:'#684E99',
         marginBottom:10
     },
     title:{
         fontSize:55,
         fontWeight:'400',
         color:'#684E95'
     },
     container:{
       flexDirection:'column',
       alignItems:'center'
     },
     Image:{
         height:100,
         width:100
     }
 })
export default Component