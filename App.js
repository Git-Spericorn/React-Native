/* eslint-disable no-unused-vars */
// importing packages including third party packages
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import firebase from 'react-native-firebase';
import 'react-native-gesture-handler';
import type, {
  RemoteMessage,
  Notification,
  NotificationOpen,
} from 'react-native-firebase';
import RNFetchBlob from 'rn-fetch-blob';

// importing components
import Splash from './components/Splash';
import Login from './components/Login';
import Home from './components/Home';
import SideMenu from './components/SideMenu';
import LeaveRequest from './components/LeaveRequest';
import PaySlipRequest from './components/PaySlipRequest';
import PaySlipRequestList from './components/PaySlipRequestList';
import Profile from './components/Profile';
import LeaveHistory from './components/LeaveHistory';
import LeaveDetails from './components/LeaveDetails';
import LeaveRequestList from './components/LeaveRequestList';
import CompoRequestList from './components/CompoRequestList';
import AddCombo from './components/AddCombo';
import Holiday from './components/Holiday';
import MyLeaveRequests from './components/MyPendingLeaveRequests';
import ReplanRequests from './components/LeaveRequest';
import ForgotPassword from './components/ForgotPassword';
import RequestWFH from './components/RequestWFH';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';

//Creating StackNAvigator for navigation
const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    headerMode: 'none',
  },
);

// For Side Drawer initialisation
const MainDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: RootStack,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    LeaveRequest: {
      screen: LeaveRequest,
    },
    PaySlipRequest: { screen: PaySlipRequest },
    Profile: { screen: Profile },
    LeaveHistory: { screen: LeaveHistory },
    LeaveDetails: { screen: LeaveDetails },
    LeaveRequestList: { screen: LeaveRequestList },
    CompoRequestList: { screen: CompoRequestList },
    AddCombo: { screen: AddCombo },
    Holiday: { screen: Holiday },
    MyLeaveRequests: { screen: MyLeaveRequests },
    ReplanRequests: { screen: ReplanRequests },
    PaySlipRequestList: { screen: PaySlipRequestList },
    RequestWFH: { screen: RequestWFH },
    EmployeeList: { screen: EmployeeList },
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: SideMenu,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
    },
  },
);

const navigate = createStackNavigator(
  {
    Splash: { screen: Splash },
    Login: {
      screen: Login,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    ForgotPassword: { screen: ForgotPassword },
    Home: {
      screen: MainDrawerNavigator,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    LeaveHistory: { screen: LeaveHistory },
    LeaveDetails: { screen: LeaveDetails },
    LeaveRequestList: { screen: LeaveRequestList },
    AddCombo: { screen: AddCombo },
    Holiday: { screen: Holiday },
    LeaveRequest: {
      screen: LeaveRequest,
    },
    MyLeaveRequests: { screen: MyLeaveRequests },
    ReplanRequests: { screen: ReplanRequests },
    PaySlipRequest: { screen: PaySlipRequest },
    PaySlipRequestList: { screen: PaySlipRequestList },
    EmployeeDetails: { screen: EmployeeDetails },
  },
  {
    initialRouteName: 'Splash',     //setting initial route
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(navigate); 

export default class App extends React.Component {

  //Register for Push notification
  
  componentWillMount() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // Process your notification as required
      });

    this.messageListener = firebase.messaging().onMessage(message => {
      // Process your message as required

    });
  }

  componentWillUnmount() {
    this.notificationListener();
    this.messageListener();
    this.notificationOpenedListener();
  }

  componentDidMount() {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions

          this.getToken();
        } else {
          this.askPermission();
        }
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;

      });

    firebase
      .notifications()
      .getInitialNotification()
      .then(notificationOpen => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification = notificationOpen.notification;
        }
      });
  }

  askPermission = () => {
    firebase
      .messaging()
      .requestPermission()
      .then(permission => {

        this.getToken();
      })
      .catch(error => {
      });
  };

  getToken = () => {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
        } else {
        }
      });
  };

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          this.navigatorRef = navigatorRef;
        }}
      />
    );
  }
}
