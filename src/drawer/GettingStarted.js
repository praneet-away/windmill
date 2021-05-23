import React,{Component} from 'react';
import { Text, View,TouchableOpacity} from 'react-native';
import {CustomHeader} from '../index';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


export class GettingStarted extends Component{
    render(){
        return (
            <SafeAreaView style={{ flex: 1}}>
            <CustomHeader title="Getting Started" navigation={this.props.navigation}/>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity 
            style = {{marginTop:30}}>
            <Text> Getting Started</Text>
            </TouchableOpacity>
            </View>
            </SafeAreaView>
    
            
  );

    }
}