import React, { Component } from 'react';
import { Image,FlatList,View,StyleSheet,ActivityIndicator,Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,DatePicker } from 'native-base';
import CardComponent from '../components/CardComponent';
import action from '../actions/index'
import TagInput from 'react-native-tags-input';
const mainColor = '#3ca897';
class CardImageExample extends Component {

  state={
    dataRecieved:false,
    tags: {
      tag: '',
      tagsArray: []
    },
    tagsColor: mainColor,
    tagsText: '#fff',
    fromDate: '',
    toDate:''
  }

  refresh=()=>{
    this.props.fetchImages(this.state.tags.tagsArray,this.state.fromDate,this.state.toDate);
  }

  setFromDate=(newDate)=>{
    this.setState({fromDate:newDate})
  }
  setToDate=(newDate)=>{
    this.setState({toDate:newDate})
  }

  renderCard=({item})=>{
    
      return (
        <CardComponent id={item['_id']} name={item.key} ></CardComponent>
      )
  }
  componentWillReceiveProps(){
    ('compoenent will recieve props')
  }
  componentDidMount(){
    this.props.fetchImages(this.state.tags.tagsArray,this.state.fromDate,this.state.toDate);
    
  }

  updateTagState = (state) => {
    this.setState({
      tags: state
    })
  };

  render() {
    (this.state)
    if(this.props.images){
      return(
        <Container>
        <Header />
        <Content>
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
      <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select From  date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setFromDate}
            disabled={false}
            />
            <Text>
              Date: {this.state.fromDate.toString().substr(4, 12)}
            </Text>
            <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select to  date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setToDate}
            disabled={false}
            />
            <Text>
              Date: {this.state.toDate.toString().substr(4, 12)}
            </Text>
            <Button onPress={this.refresh} style={styles.buttons} success><Text> Refresh </Text></Button>

          <FlatList
          renderItem={this.renderCard}
          data={this.props.images}
          keyExtractor={(x)=>x._id}
          />
        </Content>
      </Container>
      )
    }else{
      return(
        <ActivityIndicator></ActivityIndicator>
      )
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

const mapStateToProps=(state)=>{
  return {
    images:state.fetchUsers
  }
}

const mapActionsToProps={
  fetchImages:action.fetchImages,
  
}

export default connect(mapStateToProps,mapActionsToProps)(CardImageExample)




