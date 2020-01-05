import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import OptionScreen from './src/screens/OptionScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import OrdersScreen from './src/screens/OrdersScreen';

console.disableYellowBox = true;

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Categories: CategoryScreen,
    Options: OptionScreen,
    Login: LoginScreen,
    Profile: ProfileScreen,
    Register: RegisterScreen,
    Orders: OrdersScreen,
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
