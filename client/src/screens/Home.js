import React from 'react'
import {View,StyleSheet,ActivityIndicator,Dimensions} from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'
import { Container, Header, Content, Button, Text } from 'native-base';
import store from '../store';
import TagInput from 'react-native-tags-input';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../constants';



import { connect } from 'react-redux';
import Actions from '../actions/index';
const mainColor = '#3ca897';

class Home extends React.Component { 
    state ={ photos:null,JWT_Token:null,
        tags: {
        tag: '',
        tagsArray: []
      },
      tagsColor: mainColor,
      tagsText: '#fff' }
    
    logout=async ()=>{
          this.props.googleSignOut(this.props.navigation);
    }
    updateTagState = (state) => {
        this.setState({
          tags: state
        })
      };

    async componentDidMount(){
        const strObj = await AsyncStorage.getItem(Constants.CURRENT_USER);
        const obj=JSON.parse(strObj)
        this.setState({JWT_Token:obj.jwtToken})

    }


    upload=async()=>{
        if(!this.state.photos){
            alert('Please select Image First')
            return 0;
        }
        const { photos }=this.state;

        axios.post(`${Constants.SERVER_URL}/v1/imageupload/imageUploadRequest`,{
            fileName:this.state.photos.name
        },{
            headers:{
                "Authorization":this.state.JWT_Token
            }
        })
        .then(x=>x.data)
        .then(x=>{
            const key=x.key;
            return RNFetchBlob.fetch('PUT', x.url, {'Content-Type':photos.type}, RNFetchBlob.wrap(photos.uri))    
        }).then(x=>{
             return axios.post(`${Constants.SERVER_URL}/v1/imageupload/imageUploadComplete`,{
                 ...photos,tags:this.state.tags.tagsArray
             },{headers:{"Authorization":this.state.JWT_Token
            }})
        }).then(x=>{
            
            alert('Image Uploaded Successfully')
        })
        .catch(x=>{
            (x);
            alert('Unable to Upload')
        });

    }

    pick=async ()=>{
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            });
            this.setState({photos:res})
          
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }
    render(){
        (this.state)
        if(!this.state.JWT_Token){
            return(
                <ActivityIndicator></ActivityIndicator>
            )
        }else{
            return(
                <Container>
            <Header />
            <Content>
              <Button onPress={this.pick} style={styles.buttons} success><Text> Select Image </Text></Button>
              <View style={styles.container}>
        <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder="Tags..."                            
          label='Press comma & space to add a tag'
          labelStyle={{color: '#fff'}}
        //   leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText}/>}
          leftElementContainerStyle={{marginLeft: 3}}
          containerStyle={{width: (Dimensions.get('window').width - 40)}}
          inputContainerStyle={[styles.textInput, {backgroundColor: this.state.tagsColor}]}
          inputStyle={{color: this.state.tagsText}}
          onFocus={() => this.setState({tagsColor: '#fff', tagsText: mainColor})}
          onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
          autoCorrect={false}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
          keysForTag={', '}/>
      </View>
              <Button onPress={this.upload} style={styles.buttons} info><Text> Upload Image </Text></Button>
              <Button  onPress={thisout} style={styles.buttons}  warning><Text> Logout </Text></Button>
            </Content>
          </Container>
        );
        }
        
    }
         
}


const styles=StyleSheet.create({
    buttons:{
        flexDirection:'row',
        margin:10,
        alignItems:'center',
        justifyContent:'center'
    }, container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
        margin:10
      },
      textInput: {
          height: 40,
          borderColor: 'white',
          borderWidth: 1,
          marginTop: 8,
          borderRadius: 5,
          padding: 3,
        },
        tag: {
            backgroundColor: '#fff'
          },
        tagText: {
            color: mainColor
          }
    
    
})


const mapActionToProps= {
    googleSignOut:Actions.googleSignOut
}

const mapStateToProps=(state)=>{
    return state;
}
export default connect(mapStateToProps,mapActionToProps)(Home)