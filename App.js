import * as React from 'react';
import { Text, View,TouchableOpacity,Image,ScrollView,Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {widthToDp as wp,heightToDp as hp} from './src/utils'
import { AppLoading, SplashScreen } from 'expo';
import {CustomHeader,CustomDrawerContent} from './src'
import {DashboardScreen,ConnectionDetail,ControlScreen,ControlScreenDetail} from './src/tab'
import {BillingScreen,ConsumptionScreen,Documentation,GettingStarted,ReportABug} from './src/drawer';
import {LoginUI,OTPAuth} from './src/auth'
import {IMAGE} from './src/constants/Images'
import firebase from './config.js';
import { Asset } from 'expo-asset';

const Tab = createBottomTabNavigator();
function TabNavigator(){
  return(
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color}) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused
              ? IMAGE.ICON_DASHBOARD
              : IMAGE.ICON_DASHBOARD_UC;

          } else if (route.name === 'Control') {
            iconName = focused 
            ? IMAGE.ICON_CONTROL_PANEL
            : IMAGE.ICON_CONTROL_PANEL_UC;
          }

          // You can return any component that you like here!
          return <Image source={iconName} style={{width:wp('5.5%'),height:hp('5.5%')}} resizeMode="contain"/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#ffa366',
        style:{
          //marginBottom:hp('0.5%'),
          justifyContent:'center',
          height:hp('7%')
        },
        labelStyle:{
          marginBottom:5,
          justifyContent:'center'
        }
      }}
    >

        <Tab.Screen name="Dashboard" component={DashboardStack} />
        <Tab.Screen name="Control" component={ControlStack} />
      </Tab.Navigator>
      

  )
}
const navOptionHandler = ()=>({
  headerShown:false
})


function DrawerNavigator ({navigation}){
  return(
          <Drawer.Navigator initialRouteName="Dashboard" 
        drawerContent={() => <CustomDrawerContent navigation={navigation}/>}>
        
        <Drawer.Screen name="Dashboard" component={TabNavigator} />
        <Drawer.Screen name="Billing" component={BillingScreen} />
        <Drawer.Screen name="Consumption" component={ConsumptionScreen} />
        <Drawer.Screen name="Control Panel Detail"  component={ControlScreenDetail}/>
        
        <Drawer.Screen name="Getting Started"  component={GettingStarted}/>
        <Drawer.Screen name="Documentation"  component={Documentation}/>
        <Drawer.Screen name="ReportABug"  component={ReportABug}/>
        <Drawer.Screen name="Log Out"  component={TabNavigator}/>
        
      </Drawer.Navigator>
  )
}
const StackDashboard = createStackNavigator();
function DashboardStack(){
  return(
    <StackDashboard.Navigator initialRouteName="Dashboard">
      <StackDashboard.Screen name="Dashboard" component={DashboardScreen} options={navOptionHandler}/>
      <StackDashboard.Screen name="Connection Detail" component={ConnectionDetail} options={navOptionHandler}/>
    </StackDashboard.Navigator>
  )
}

const StackControl = createStackNavigator();
function ControlStack(){
  return(
    <StackControl.Navigator initialRouteName="Control Panel">
      <StackControl.Screen name="Control Panel" component={ControlScreen} options={navOptionHandler}/>
      <StackControl.Screen name="Control Panel Setting" component={ControlScreenDetail} options={navOptionHandler}/>
    </StackControl.Navigator>
  )
}
const Drawer = createDrawerNavigator();
const StackApp = createStackNavigator();
const StackAuth = createStackNavigator();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
} 

export default class App extends React.Component {
  constructor(){
      super()
      this.state = {
        isReady : false,
        loggedIn: null
      }
    }

    componentDidMount(){

    
        firebase.auth().onAuthStateChanged(user => {
          //console.log(user)
            
          if(user){
             this.setState({
               loggedIn:true
             })
          }
          else{
            this.setState({
              loggedIn:false
            })
          }
      });
      
      
  }
  
  
   async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./src/images/sub-station.jpg'),
    ]);
  await Promise.all([...imageAssets]);

   }
    
    render(){
      
        if (!this.state.isReady) {
          return (
            <AppLoading
              startAsync={this._loadAssetsAsync}
              onFinish={() => this.setState({isReady:true})}
              onError={console.warn}
            />
          );
        }
    if(this.state.loggedIn)
    { 
    return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="HomeApp">
      <StackApp.Screen name="HomeApp" component={DrawerNavigator} options={navOptionHandler}/>
    </StackApp.Navigator>
    </NavigationContainer>
    );
    }
    else
    {
      return(<LoginUI/>);
    }

}

}

