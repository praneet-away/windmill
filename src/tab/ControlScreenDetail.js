import React,{Component} from 'react';
import { Text, View,TouchableOpacity} from 'react-native';
import {CustomHeader} from '../index';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


export class ControlScreenDetail extends Component{
    render(){
        return (
                    <SafeAreaView style={{ flex: 1}}>
            <CustomHeader title="CONTROL PANEL" navigation={this.props.navigation}/>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity 
            style = {{marginTop:30}}>
                <Text> IOT_ENABLE{"\n"}</Text>
                <Text> Control Panel Setting {"\n"}</Text>
            </TouchableOpacity>
            
            </View>
            </SafeAreaView>
  );

    }
}