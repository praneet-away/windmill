import React,{Component} from 'react';
import { Text, View,TouchableOpacity,Image,ScrollView,Linking,Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon,Button } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import {IMAGE} from './constants/Images';
import firebase from '../config.js';
import {widthToDp,heightToDp} from './utils';
export class CustomDrawerContent extends Component {
  constructor(props) {
    super(props)
      this.state = {
      messages: {}
    }
  }

  componentDidMount(){
    firebase
      .database()
      .ref()
      .child("IOT_ENABLE")
      .child("User")
      .on("value", snapshot => {
      this.setState({
        messages: snapshot.val()
      })
      })
      
  }
        render(){
            return(
      <SafeAreaView>
      <LinearGradient
          colors={['#ff9933', '#ff9966', '#ff5050']}
          start={[0.0, 1.0]}
          end={[1.0, 0.0]}
          >
    
      <SafeAreaView style={{height:heightToDp('30%'),alignItems:'center',marginTop:heightToDp('5%')}}>
        <Avatar
        size={heightToDp('15%')}
        rounded
        overlayContainerStyle={{backgroundColor: '#ccc'}}
        source={IMAGE.ICON_USER}
        />
      <Text style={{marginTop:heightToDp('3%'),fontSize:widthToDp('6%')}}>{this.state.messages.Username}</Text>
   
      
      <Button
        buttonStyle={{borderRadius:10,marginTop:heightToDp('2%')}}
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
        colors: ['#1a75ff', '#ff1a75'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        }}
        onPress={()=>this.props.navigation.navigate('Connection Detail')}
        title="IOT ENABLE"
        titleStyle={{fontSize:widthToDp('4%')}}
      />
      </SafeAreaView>
      <ScrollView style={{marginLeft:widthToDp('5%')}}>

        <TouchableOpacity style = {{marginTop:heightToDp('6%')}} onPress={()=>this.props.navigation.navigate('Consumption')}>
        <Text style={{fontSize:widthToDp('4%'),color:'#e6e6e6'}}>  
        <Image source={IMAGE.ICON_USAGE} style={{width:widthToDp('6%'),height:heightToDp('3%')}} resizeMode='contain'/>
        {"\t\t\t"}CONSUMPTION
        </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style = {{marginTop:heightToDp('2%')}} onPress={()=>this.props.navigation.navigate('Billing')}>
        <Text style={{fontSize:widthToDp('4%'),color:'#e6e6e6'}}>  
        <Image source={IMAGE.ICON_RUPEE} style={{width:widthToDp('6%'),height:heightToDp('3%')}} resizeMode='contain'/>
        {"\t\t\t"}BILLING
        </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style = {{marginTop:heightToDp('2%')}} onPress={()=>this.props.navigation.navigate('Control Panel Detail')}>
        <Text style={{fontSize:widthToDp('4%'),color:'#e6e6e6'}}>  
        <Image source={IMAGE.ICON_CONTROL_PANEL_DETAIL} style={{width:widthToDp('6%'),height:heightToDp('3%')}} resizeMode='contain'/>
        {"\t\t\t"}CONTROL PANEL DETAIL
        </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style = {{marginTop:heightToDp('6%')}} onPress={()=>this.props.navigation.navigate('Getting Started')}>
        <Text style={{fontSize:widthToDp('4%'),color:'#e6e6e6'}}>  
        <Image source={IMAGE.ICON_PLANE} style={{width:widthToDp('6%'),height:heightToDp('3%')}} resizeMode='contain'/>
        {"\t\t\t"}GETTING STARTED
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style = {{marginTop:heightToDp('2%')}} onPress={()=>this.props.navigation.navigate('Documentation')}>
        <Text style={{fontSize:widthToDp('4%'),color:'#e6e6e6'}}>  
        <Image source={IMAGE.ICON_DOCUMENTATION} style={{width:widthToDp('6%'),height:heightToDp('3%')}} resizeMode='contain'/>
        {"\t\t\t"}DOCUMENTATION
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style = {{marginTop:heightToDp('2%')}} onPress={()=>this.props.navigation.navigate('ReportABug')}>
        <Text style={{fontSize:widthToDp('4%'),color:'#e6e6e6'}}>  
        <Image source={IMAGE.ICON_BUG} style={{width:widthToDp('6%'),height:heightToDp('3%')}} resizeMode='contain'/>
        {"\t\t\t"}REPORT A BUG
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style = {{marginTop:heightToDp('2%'),marginBottom:heightToDp('4%')}} onPress={() => firebase.auth().signOut()}>
        <Text style={{fontSize:widthToDp('4%'),color:'#e6e6e6'}}>  
        <Image source={IMAGE.ICON_LOG_OUT} style={{width:widthToDp('6%'),height:heightToDp('3%')}} resizeMode='contain'/>
        {"\t\t\t"}LOG OUT
        </Text>
        </TouchableOpacity>

      </ScrollView>
      <SafeAreaView style={{alignItems:'center',marginTop:heightToDp('0%'),marginBottom:heightToDp('2%')}}>
      <Text style={{fontSize:widthToDp('3%')}}>Ver 1.0.1 (BETA)</Text>
      <Text style={{fontSize:widthToDp('3%')}}>Made by <Text style={{textDecorationLine:'underline',fontSize:widthToDp('3%')}}>IOTian</Text></Text>
      
      </SafeAreaView>
      </LinearGradient>
    
    </SafeAreaView>
    
            )
        }
}