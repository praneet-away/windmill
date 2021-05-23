import React,{Component} from 'react';
import { Text, View,TouchableOpacity,Image,ScrollView,Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {IMAGE} from './constants/Images'
import { Icon,Button } from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import firebase from '../config.js';

export class CustomHeader extends Component{
    render(){
      let {navigation,isHome,title} = this.props
        return(

            <View>
    <LinearGradient
          colors={['#ff9933', '#ff9966', '#ff5050']}
          >
      
    <View style={{flexDirection:'row',height:60}}>
      {
      
      isHome?
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Icon name='bars' type='font-awesome' color='#000' onPress={() => navigation.openDrawer()} />
      </View> 
      :
        <TouchableOpacity onPress= {() => navigation.goBack()}style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{width:25,height:25,marginLeft:5}} 
          source={IMAGE.ICON_BACK}
          resizeMode='contain'
          />  
        </TouchableOpacity>

      }
      
      <View style={{flex:5,justifyContent:'center'}}>
  <Text style={{textAlign:'center',fontSize:20,color:'#ffffff'}}>{title}</Text>
      </View>
      
      {
      isHome?
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Icon name="sign-out" type='font-awesome'  onPress={() => firebase.auth().signOut()}/>
      </View> 
      :null
      }
      </View>
      </LinearGradient>
      </View>    
      
        )}
}