import React,{Component} from 'react';
import { Text, View,TouchableOpacity,Switch, StyleSheet,StatusBar,ScrollView} from 'react-native';
import {CustomHeader} from '../index';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from '../../config';
import { Button } from 'react-native-elements';

export class ControlScreen extends Component{
    constructor(props) {
    super(props)

    this.state = {
      messages: {},
      master:{},
      mains: '',
      switch1:'',
      switch2:'',
    }
  }  
    
    togglemains = (value) => {
    if(value)
    {
    this.setState({mains: value})
    firebase.database().ref('IOT_ENABLE/Control').update({
        mains:value
    })
    firebase.database().ref('IOT_ENABLE/DATA').update({
        Status:"ON"
    })
    }
    else if(!value)
    {
    this.setState({
        mains: value,
        switch1:value,
        switch2:value
    })
    firebase.database().ref('IOT_ENABLE/Control').update({
        mains:value,
        switch1:value,
        switch2:value
    })  
    firebase.database().ref('IOT_ENABLE/DATA').update({
            Status:"OFF"
    })
    }
    }
    
    toggleSwitch1 = (value) => {
    this.setState({switch1: value})
    firebase.database().ref('IOT_ENABLE/Control').update({
        switch1:value
    })
    }
    
    toggleSwitch2 = (value) => {
    this.setState({switch2: value})
    firebase.database().ref('IOT_ENABLE/Control').update({
        switch2:value
    })
    }
            
  componentDidMount(){
    firebase
      .database()
      .ref()
      .child("IOT_ENABLE")
      .child("Control")
      .on("value", snapshot => {
      const data = snapshot.val()
      this.setState({
          messages: data,
          });
      });
      firebase
      .database()
      .ref()
      .child("IOT_ENABLE")
      .child("Master")
      .on("value", snapshot => {
      const datamas = snapshot.val()
        if(!datamas.masname)
        {
          firebase.database().ref('IOT_ENABLE/Control').update({
            mains:false,
            switch1:false,
            switch2:false
          })
          firebase.database().ref('IOT_ENABLE/DATA').update({
            Status:"OFF"
          })
        }  
        this.setState({
          master: datamas,
          });
              
     });
     
     
  }
  
    render(){
        return (
            <SafeAreaView style={{ flex: 1}}>
            <CustomHeader title="CONTROL PANEL" isHome={true} navigation={this.props.navigation}/>
              <LinearGradient
          colors={['#D4D6D7', '#878F97']}
          start={[0.0, 0.5]}
          end={[1.0, 1.0]}
          >
         <ScrollView>
        <LinearGradient
          colors={['#A838AB', '#EA6060']}
          start={[1, 0.0]}
          end={[0.0, 1]}
          
        >
        <View style={{height:175}}>
            <Text style={{marginLeft:30,fontSize:20,marginTop:5}}>MAINS : {this.state.messages.mains?'ON':' OFF'}</Text>
            <Text style={{color:'#ffffff',marginLeft:325,marginTop:5}}>{this.state.messages.mains?'ON':' OFF'}</Text>
            
            <Switch
                disabled={this.state.master.masname ? false : true}
                style={{marginRight:95,transform: [{ scaleX: 1.5}, { scaleY: 1.5 }]}}
                trackColor={{ false: "#ff3300", true: "#33cc33" }}
                thumbColor={"#ffffff"}
                onValueChange={this.togglemains}
                value={this.state.messages.mains}
            />
            <Text style={{marginLeft:30,fontSize:20}}>Single Phase 230V</Text>
            <Text style={{marginLeft:30,fontSize:20}}>250 W</Text>
            
            </View>
         </LinearGradient>
        
        <LinearGradient
          colors={['#C297FA', '#7367f0']}
          start={[0, 1.0]}
          end={[1.0, 0]}
          
          style={{marginTop:20}}
          >
        <View style={{height:175}}>
            <Text style={{marginLeft:30,fontSize:20,marginTop:5}}>MOTOR 1 : {this.state.switch1?'ON':' OFF'}</Text>
            
            <Switch
                disabled={this.state.messages.mains ? false : true}
                style={{marginRight:95,transform: [{ scaleX: 1.5}, { scaleY: 1.5 }]}}
                trackColor={{ false: "#ff3300", true: "#33cc33" }}
                //thumbColor={this.state.switchValue ? "#f5dd4b" : "#ff0066"}
                thumbColor={"#ffffff"}
                onValueChange={this.toggleSwitch1}
                value={this.state.messages.switch1}
            />
            <Text style={{color:'#ffffff',marginLeft:325,marginTop:5}}>{this.state.switch1?'ON':' OFF'}</Text>
            <Text style={{marginLeft:30,fontSize:20}}>Single Phase 230V</Text>
            <Text style={{marginLeft:30,fontSize:20}}>200 W</Text>
            
        </View>
    </LinearGradient>

    <LinearGradient
          colors={['#C297FA', '#7367f0']}
          start={[0, 1.0]}
          end={[1.0, 0]}
          style={{marginTop:20}}
          >
        <View style={{height:175}}>
            <Text style={{marginLeft:30,fontSize:20,marginTop:5}}>MOTOR 2 : {this.state.switch2?'ON':' OFF'}</Text>
            
            <Switch
                disabled={this.state.messages.mains ? false : true}
                style={{marginRight:95,transform: [{ scaleX: 1.5}, { scaleY: 1.5 }]}}
                trackColor={{ false: "#ff3300", true: "#33cc33" }}
                //thumbColor={this.state.switchValue ? "#f5dd4b" : "#ff0066"}
                thumbColor={"#ffffff"}
                onValueChange={this.toggleSwitch2}
                value={this.state.messages.switch2}
            />
            <Text style={{color:'#ffffff',marginLeft:325,marginTop:5}}>{this.state.switch2?'ON':' OFF'}</Text>
            <Text style={{marginLeft:30,fontSize:20}}>Single Phase 230V</Text>
            <Text style={{marginLeft:30,fontSize:20}}>60 W</Text>
            
        </View>
        </LinearGradient>
        </ScrollView>
        </LinearGradient>     
    </SafeAreaView>
  );

    }
}
const styles = StyleSheet.create({
  
  listItemContainer:{
    backgroundColor:'#ccc',
    marginTop:50,
    margin : 20,
    borderRadius: 10,
  },
  newline:{
    backgroundColor:'#fff'
  },
  listItem:{
    fontSize: 25,
    padding: 15
  },
  bgcolorfalse:{
    fontSize: 25,
    padding: 15,
    backgroundColor: '#ff3300'
  },
  bgcolortrue:{
    fontSize: 25,
    padding: 15,
    backgroundColor: '#33cc33'
  }
});