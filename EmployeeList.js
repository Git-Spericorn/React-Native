/* eslint-disable react-native/no-inline-styles */

//importing packages
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
import {connect} from 'react-redux';
import NetInfo from "@react-native-community/netinfo";

//importingf modules
import userActions from '../actions/userActions';
import Header from './Header';
import Loader from './Loader';

const mapStateToProps = state => ({
  user: state.user,
}); // mapping state to props

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      loader: true,
      empList: [],
      empName: '',
      alertCount:1
    };
  }

  componentDidMount() {
    this.renderFuntion();
  }

  renderFuntion = async () => {
    this.setState({loader: true});
    const token = await AsyncStorage.getItem('token');
    const userListParam = {
      token,
      url: '',
    };
    this.setState({token});
    await this.getEmpList(userListParam);
    this.setState({loader: false});
  };

  searchByName = async () => {
    const {token, empName} = this.state;
    const userListParam = {
      token,
      url: `?name=${empName}`,
    };
    await this.getEmpList(userListParam);
  };

  getEmpList = async param => {
   const empl=  await this.props.getEmpListAll(param);   // api call

   console.log('getEmpList',JSON.stringify(empl))

    setTimeout(() => {
      if (this.props.user.empAllList && this.props.user.empAllList.data) {
        this.setState({
          empList: this.props.user.empAllList.data.users,
          loader: false,
        });
      }
    }, 1000);


// Checking the internet connection
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      if(state.isConnected != true)
      {
        if(this.state.alertCount != 2)
        {
        alert("No internet Connection")
        }
        this.setState({
          loader:false,
          alertCount : this.state.alertCount + 1
        })
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.user.empAllList !== this.props.user.empAllList &&
      this.props.user.empAllList.data
    ) {
      this.setState({
        empList: this.props.user.empAllList.data.users,
        loader: false,
      });
    }
  }

  render() {
    console.log('this.props.user', this.props.user);
    return (
      <SafeAreaView
        style={styles.container}
        ref={navigatorRef => {
          this.navigatorRef = navigatorRef;
        }}>
        {this.state.loader && <Loader />}
        <NavigationEvents onWillFocus={() => this.renderFuntion()} />  
        {/* re rendering function when come back to this component */}
        <Header
          navigation={this.props.navigation}
          headerTitle="Employee List"
        />
        <ScrollView style={{padding: RFValue(10)}}>
          <View style={styles.body}>
            <TextInput
              placeholder="Search"
              style={{
                width: '100%',
                // height: RFValue(30),
                marginBottom: RFValue(5),
                padding: RFValue(10),
                borderWidth: 1,
                borderColor: '#FEFEFE',
                borderRadius: RFValue(5),
              }}
              onChangeText={name => this.setState({empName: name})}
              onEndEditing={() => this.searchByName()}
            />
            {this.state.empList.map((emp, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.empList}
                  onPress={() =>
                    this.props.navigation.navigate('EmployeeDetails', {
                      empId: emp.id,
                    })
                  }
                  >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: `https://pm.spericorn.com/media/${
                          emp.profile_pic
                        }`,
                        cache: 'force-cache',
                      }}
                      style={{
                        width: RFValue(40),
                        height: RFValue(40),
                        marginRight: RFValue(10),
                        borderRadius: RFValue(10),
                      }}
                    />
                    <Text>{`${emp.first_name} ${emp.last_name}`}</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../assets/images/right-arrow.png')}
                    style={{width: RFValue(20), height: RFValue(30)}}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF4F9',
  },
  body: {
    padding: RFValue(5),
  },
  empList: {
    height: RFValue(50),
    backgroundColor: '#ffffff',
    padding: RFValue(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: RFValue(5),
    marginBottom: RFValue(5),
  },
});

export default connect(
  mapStateToProps,
  {...userActions},
)(EmployeeList);
