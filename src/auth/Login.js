import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions,TextInput,TouchableOpacity} from 'react-native';
import Animated,{Easing} from 'react-native-reanimated';
import{TapGestureHandler,State} from 'react-native-gesture-handler';
import firebase from '../../config.js';
import Svg,{Image,Circle,ClipPath} from 'react-native-svg';
import { Icon,Button } from 'react-native-elements';
import {IMAGE} from '../constants/Images';
import {OTPAuth} from './OTP'
import {CustomHeader} from '../index';
const { width, height } = Dimensions.get('window');

const {
  Value,event,block,cond,eq,set,Clock,startClock,stopClock,debug,timing,clockRunning,interpolate,Extrapolate,concat} = Animated
function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
  
}
export  class LoginUI extends React.Component {

  
  constructor(){
    super()
    this.state={
      email:'',
      password:'',
      error:'',
      loading:true,
      isSuccess:true,
      isOTP:false
    }
    
    this.buttonOpcity = new Value(1)

    this.onStateChangeEMAIL = event([
      { 
        nativeEvent:({state})=>block([
          
          cond(eq(state,State.END),set(this.buttonOpcity,
          runTiming(new Clock(),1,0)))])
      }
      ]);
        
          
      this.onCloseState = event([
      {
        nativeEvent:({state})=>block([

          cond(eq(state,State.END),set(this.buttonOpcity,
          runTiming(new Clock(),0,1)))])
      }
      ])
      this.buttonY = interpolate(this.buttonOpcity,{
      inputRange:[0,1],
      outputRange:[100,0],
      extrapolate:Extrapolate.CLAMP
  });
     this.bgY = interpolate(this.buttonOpcity,{
      inputRange:[0,1],
      outputRange:[-height/3-100,0],
      extrapolate:Extrapolate.CLAMP
  });
  
    this.textInputZindex = interpolate(this.buttonOpcity,{
      inputRange:[0,1],
      outputRange:[1,-1],
      extrapolate:Extrapolate.CLAMP
  });
  this.textInputY = interpolate(this.buttonOpcity,{
      inputRange:[0,1],
      outputRange:[0,100],
      extrapolate:Extrapolate.CLAMP
  });
  this.textInputZOpacity = interpolate(this.buttonOpcity,{
      inputRange:[0,1],
      outputRange:[1,0],
      extrapolate:Extrapolate.CLAMP
  });
  this.rotateCross = interpolate(this.buttonOpcity,{
      inputRange:[0,1],
      outputRange:[0,180],
      extrapolate:Extrapolate.CLAMP
  });
  }
  onButtonPress = () =>{
      
      try{
          firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
          .then(this.onLoginSuccess)
          .catch(err=>{
            this.setState({
              error:err.message,  
              isSuccess:false,
              

            })
            setTimeout(() => {
            this.textInputEmail.clear();
            this.textInputPassword.clear();
            this.setState({
              error:'',  
              isSuccess:true,
              email:'',
              password:'',
              
            })
            }, 4000);
          })
      }
      catch(error){

      }
  }
  
  onLoginSuccess =  () =>{
        this.setState({
            error:'',
            loading:false
        })
      }
      
render() {
        if(this.state.isOTP)
        {return(<OTPAuth/>)
        }
    return (
      <View style={{flex: 1, backgroundColor: 'white',justifyContent: 'flex-end'}}> 
        <Animated.View style={{ ...StyleSheet.absoluteFill ,transform:[{translateY:this.bgY}]}}>
          <Svg height={height+100} width={width}>
          <ClipPath id='clip'>
            <Circle 
            r = {height+100} cx = {width/2}
            />
          </ClipPath>
          <Image
            href={IMAGE.ICON_SUB_STATTION}
            width={width}
            height={height+100}
            preserveAspectRatio='xMidYMId slice'
            clipPath="url(#clip)"
         />
         </Svg>
        </Animated.View>
        <View style={{ height: height / 4, justifyContent: 'center' }}>
          
        
            
          <TapGestureHandler onHandlerStateChange = {this.onStateChangeEMAIL}>
          <Animated.View style={{...styles.button,opacity: this.buttonOpcity,
          transform:[{translateY:this.buttonY}]}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>LOG IN</Text>
          </Animated.View>
          </TapGestureHandler>

          
          <Animated.View style={{...styles.button,opacity: this.buttonOpcity,
          transform:[{translateY:this.buttonY}]}} >
          <TouchableOpacity onPress={()=> this.setState({isOTP:true})}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>LOG IN WITH OTP</Text>
          </TouchableOpacity>
          </Animated.View>

           <Animated.View style={{
            zIndex:this.textInputZindex,
            opacity:this.textInputOpacity,
            transform:[{translateY:this.textInputY}],
            height:height/3,
            ...StyleSheet.absoluteFill,
            top:null,
            justifyContent:'center'}}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={{...styles.closeButton,backgroundColor:[(this.state.isSuccess) ? '#00e6ac' : '#ff5050'] }}>
                <Animated.View style={{transform:[{rotate: concat(this.rotateCross,"deg")}]}}>
                  
                <Icon name="chevron-down" type='font-awesome'/>
                </Animated.View>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
            ref={input => { this.textInputEmail = input }}
            placeholder="EMAIL"
            style={{...styles.textInput,borderColor:[(this.state.isSuccess) ? '#00e6ac' : '#ff5050']}}
            placeholderTextColor = "#cccccc"
            onChangeText={(email)=>this.setState({email})}
            />
            <TextInput
            ref={input => { this.textInputPassword = input }}
            placeholder="Password"
            secureTextEntry={true}
            style={{...styles.textInput,borderColor:[(this.state.isSuccess) ? '#00e6ac' : '#ff5050']}}
            placeholderTextColor = "#cccccc"
            onChangeText={(password)=>this.setState({password})}
            />

            <Animated.View style={{...styles.button,backgroundColor:[(this.state.isSuccess) ? '#00e6ac' : '#ff5050'] }}>
            <TouchableOpacity onPress={()=>this.onButtonPress()} >
            <Text style={{fontSize:20,fontWeight:'bold'}}> SIGN IN 
            </Text>
            </TouchableOpacity>
            </Animated.View>
            <View style={{justifyContent:'center',alignItems:'center'}}> 
            <Text style={{color:'red',marginTop:10}}> {this.state.error} </Text>
            </View>
            </Animated.View>
          </View>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#00ffbf',
    height: 50,
    marginHorizontal: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width:2,height:2},
    shadowColor:'black',
    shadowOpacity:0.2,
    elevation:3
  },
  

  closeButton:{
   alignItems:'center',
   justifyContent:'center',
   position:'absolute',
   top:-60,
   left:width/2-30,
   borderRadius:20,
   backgroundColor:'#00e6ac',
   shadowOffset: {width:2,height:2},
    shadowColor:'black',
    shadowOpacity:0.2,
    elevation:2

  },
  textInput:{
    backgroundColor:'#ffffff',
    height:50,
    borderRadius:25,
    borderWidth:2,
    marginHorizontal:20,
    paddingLeft:10,
    marginVertical:5,
    top:-25,
   
    
    
  }
  
});