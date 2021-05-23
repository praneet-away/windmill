import React,{Component} from 'react';
import { Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import {CustomHeader} from '../index';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from '../../config';

export class BillingScreen extends Component{
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
      .child("DATA")
      .on("value", snapshot => {
      const data = snapshot.val()
          this.setState({
          messages: data,
          });    
       

      
    });
  }
  
    render(){
        return (
            <SafeAreaView style={{ flex: 1,justifyContent:'center'}}>
                <CustomHeader title="Billing" navigation={this.props.navigation}/>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.listItemContainer}>
                    <Text style={styles.listItem}>Penalty Amount : {this.state.messages.Penalty_Amount} </Text>
                    <Text style={styles.listItem}>Total Amout : {this.state.messages.Total} </Text>
                </View>
                </View>
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
  
});
