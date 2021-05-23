/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';

import {LoginUI} from './Login';
import firebase from '../../config';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import {widthToDp as wp,heightToDp as hp} from '../utils'

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert
} from 'react-native';


import Spinner from 'react-native-loading-spinner-overlay';
import Form from 'react-native-form';




const MAX_LENGTH_CODE = 6;


// your brand's theme primary color
const brandColor = '#00E6AC';

const styles = StyleSheet.create({
  countryPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  header: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 22,
    margin: 20,
    color: '#4A4A4A',
  },
  form: {
    margin: 20
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: 20,
    color: brandColor
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: brandColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  wrongNumberText: {
    margin: 10,
    fontSize: 14,
    textAlign: 'center'
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: 'grey'
  },
  callingCodeView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeText: {
    fontSize: 20,
    color: brandColor,
    fontWeight: 'bold',
    paddingRight: 10
  }
});
const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    
export class OTPAuth extends React.Component {
  
  
  constructor(props) {

    
    super(props);
    //this.recaptchaVerifier = {};
    this.recaptchaVerifier = React.createRef(null);
    this.state = {
      enterCode: false,
      spinner: false,
      country: {
        cca2: 'India',
        callingCode: '+91',
      },
      phonenumber:'',
      verificationId:'',
      verificationCode:'',
      isHome:null
    };
  }

  _getCode = () => {
      
  
    //const { recaptchaToken } = this.state;
    this.setState({ spinner: true });
    //console.log('Phone Number')
    //console.log(this.state.phonenumber);

    setTimeout(async () => {

      try {
          
          //console.log(this.recaptchaVerifier.current)
           const phoneProvider = new firebase.auth.PhoneAuthProvider();
           const verification = await phoneProvider.verifyPhoneNumber(
             this.state.phonenumber,
             this.recaptchaVerifier.current
           );  
          this.setState({
            verificationId:verification
          })
          console.log(this.state.verificationId);
          this.setState({
            spinner: false,
            enterCode: true,
          });
          this.refs.form.refs.textInput.setNativeProps({ text: '' });
      
          setTimeout(() => {
            Alert.alert('Sent!', "We've sent you a verification code", [{
              text: 'OK',
              onPress: () => this.refs.form.refs.textInput.focus()
            }]);
          }, 100);
      
          
      } catch (err) {
        this.setState({ spinner: false });
        setTimeout(() => {
          Alert.alert('Oops!', err.message);
        }, 100);
      }

    }, 100);
  
  }

  _verifyCode = () => {

    this.setState({ spinner: true });

    setTimeout(async () => {

      try {

        //console.log(this.state.verificationCode)
        this.refs.form.refs.textInput.blur();
        const credential = firebase.auth.PhoneAuthProvider.credential(
          this.state.verificationId,
          this.state.verificationCode
        );
        await firebase.auth().signInWithCredential(credential);
        this.setState({ spinner: false });
        setTimeout(() => {
          Alert.alert('Success!', 'You have successfully verified your phone number');
        }, 300);

      } catch (err) {
        // <https://github.com/niftylettuce/react-native-loading-spinner-overlay/issues/30#issuecomment-276845098>
        this.setState({ spinner: false });
        setTimeout(() => {
          Alert.alert('Oops!', err.message);
        }, 100);
      }

    }, 100);

  }

  _onChangeText = (val) => {
    if (!this.state.enterCode) {
      var ph = this.state.country.callingCode.concat(val) 
    return(
      this.setState({phonenumber:ph})
      )
    }
    if (val.length === MAX_LENGTH_CODE)
    {
      this._verifyCode();
      this.setState({
        verificationCode:val
      })
    }
    
  }

  _tryAgain = () => {
    this.refs.form.refs.textInput.setNativeProps({ text: '' })
    this.refs.form.refs.textInput.focus();
    this.setState({ enterCode: false });
  }

  _getSubmitAction = () => {
    this.state.enterCode ? this._verifyCode() : this._getCode();
  }

  

  _renderFooter = () => {

    if (this.state.enterCode)
      return (
        <View>
          <Text style={styles.wrongNumberText} onPress={this._tryAgain}>
            Enter the wrong number or need a new code?
          </Text>
        </View>
      );

    return (
      <View>
        <Text style={styles.disclaimerText}>By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone number. Message &amp; data rates may apply.</Text>
      </View>
    );

  }

  _renderCountryPicker = () => {

    if (this.state.enterCode)
      return (
        <View />
      );
    }

  _renderCallingCode = () => {

    if (this.state.enterCode)
      return (
        <View />
      );

    return (
      <View style={styles.callingCodeView}>
        <Text style={styles.callingCodeText}>{this.state.country.callingCode}</Text>
      </View>
    );

  }

  render() {
    if(this.state.isHome)
    {
      return(<LoginUI/>)
    }
    let headerText = `What's your ${this.state.enterCode ? 'verification code' : 'phone number'}?`
    let buttonText = this.state.enterCode ? 'Verify confirmation code' : 'Send confirmation code';
    let textStyle = this.state.enterCode ? {
      height: 50,
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold'
    } : {};

    return (

      <View style={styles.container}>
          <FirebaseRecaptchaVerifierModal
          ref={this.recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          /> 
         

        <Text style={styles.header}>{headerText}</Text>

        <Form ref={'form'} style={styles.form}>

          <View style={{ flexDirection: 'row' }}>

            {this._renderCountryPicker()}
            {this._renderCallingCode()}

            <TextInput
              ref={'textInput'}
              name={this.state.enterCode ? 'code' : 'phoneNumber' }
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this._onChangeText}
              placeholder={this.state.enterCode ? '_ _ _ _ _ _' : 'Phone Number'}
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              style={[ styles.textInput, textStyle ]}
              returnKeyType='go'
              autoFocus
              placeholderTextColor={brandColor}
              selectionColor={brandColor}
              maxLength={this.state.enterCode ? 6 : 10}
              onSubmitEditing={this._getSubmitAction} />

          </View>

          <TouchableOpacity style={styles.button} onPress={this._getSubmitAction}>
            <Text style={styles.buttonText}>{ buttonText }</Text>
          </TouchableOpacity>

          {this._renderFooter()}

        </Form>

        <Spinner
          visible={this.state.spinner}
          textContent={'One moment...'}
          textStyle={{ color: '#fff' }} />

      <View style={{alignItems:'center',justifyContent:'center',marginTop:hp('5%')}}>
      <TouchableOpacity onPress={()=>this.setState({isHome:true})}>
        <Text style={{fontWeight:'bold',color:'#00e6ac',fontSize:15}}> Back to Home </Text>
      </TouchableOpacity>
      </View>
      </View>
      
    );
  }
}

