/**
 * Created by radughitescu on 2019-07-14
 */
import React, { Component } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Homepage from './Homepage';

export default class AppContainer extends Component {
  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <Homepage />
      </SafeAreaView>
    );
  }
}
