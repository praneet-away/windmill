import React,{Component} from 'react';
import { Text, View,TouchableOpacity,StyleSheet,StatusBar,ScrollView,Dimensions } from 'react-native';
import {CustomHeader} from '../index';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from '../../config';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {widthToDp as wp,heightToDp as hp} from '../utils';





export class DashboardScreen extends Component{
    constructor(props) {
    super(props)

    this.state = {
      messages: {},
      st: false,
      expoPushToken: '',
      notification: {},
    }
  }
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      
      try{
      let token = await Notifications.getExpoPushTokenAsync();
      
      this.setState({ expoPushToken: token });
      //console.log(this.state.expoPushToken)
      firebase
      .database()
      .ref('IOT_ENABLE/User')
      .update({
        pushToken:this.state.expoPushToken
      })

      }
      catch(error){
        console.log(error)
      }  
    
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };    
  
  sendPushNotification =  () => {
    const message = {
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'Over Power Usage',
      body: 'Your Power Usage is ' + this.state.messages.Power + ' Watt\nYour Limit is '+this.state.messages.Limit +' Watt\nPls apply to increase your limit.',
      data: { data: 'Data1' },
      _displayInForeground: true,
      channelId:"default",
    };

    const response = fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    //console.log(response)
  }


  


  componentDidMount(){
    this.registerForPushNotificationsAsync();
    
   
    firebase
      .database()
      .ref()
      .child("IOT_ENABLE")
      .child("DATA")
      .on("value", snapshot => {
      const data = snapshot.val()
        if(data.Status == "ON" ){
            this.setState({
            messages: data,
            st:true,
            });
            

    firebase.database().ref('IOT_ENABLE/Control').update({
      mains: true
    })
    }
        else{
          this.setState({
          messages: data,
          st:false,
          });
          firebase.database().ref('IOT_ENABLE/Control').update({
              mains: false
          })    
      }  

      if (this.state.messages.Power > this.state.messages.Limit)
      {
        let title="Power Usage"
        //console.log("Function Callled")
        this.sendPushNotification()
      }  
      
    });
  }
    render(){
        return(
        <SafeAreaView>
      <LinearGradient
          colors={['#D4D6D7', '#878F97']}
          start={[0.0, 0.5]}
          end={[1.0, 1.0]}
          >
        <CustomHeader title="DASHBOARD" isHome={true} navigation={this.props.navigation}/>
      <View style={{marginTop:hp('2.5%'),margin:wp('4%')}} height={height=hp('100%')}>
      
      <Text style={[(this.state.st) ? styles.bgcolortrue : styles.bgcolorfalse]}>Status : {this.state.messages.Status}</Text>
      
      
      
      
      <ScrollView>
      <LinearGradient
          colors={['#f8bb66', '#f38381']}
          style={{borderRadius:10,marginTop:80,marginBottom:500}}
          start={[0.0, 1.0]}
          end={[1.0, 0.0]}
          >
      <Text style={styles.listItem}>Voltage : {this.state.messages.Voltage} V</Text>
      <Text style={styles.listItem}>Current : {this.state.messages.Current} Amp</Text>
      <Text style={styles.listItem}>Power : {this.state.messages.Power} W</Text>
      <Text style={styles.listItem}>Penalty : {this.state.messages.Penalty}</Text>
      </LinearGradient>
      </ScrollView>
  </View>
      </LinearGradient>
    </SafeAreaView>
        );

    }
}

const styles = StyleSheet.create({
  
  listItem:{
    fontSize: wp('6%'),
    padding: hp('3%'),
    marginTop:hp('3%'),
    borderRadius:wp('2%')
  },
  bgcolorfalse:{
    fontSize: wp('6%'),
    padding: hp('3%'),
    marginTop:hp('1.5%'),
    borderRadius:wp('4%'),
    backgroundColor: '#ff471a',
    
  },
  bgcolortrue:{
    fontSize: wp('6%'),
    padding: hp('3%'),
    marginTop:hp('1.5%'),
    borderRadius:wp('4%'),
    backgroundColor: '#47d147',
    
  }
});

{/*"ExponentPushToken[Hs3audP5TARF6lGDygmb3W]"*/}