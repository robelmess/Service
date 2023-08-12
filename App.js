import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useState, useRef, useEffect } from 'react'
import { useColorScheme, StyleSheet, View } from 'react-native';

import { requestUserPermission, NotificationListener, GetFCMToken, checkToken, getFCMToken } from "./utils/pushnotification_helper"

const Stack = createNativeStackNavigator();

function App() {
  const theme = useColorScheme()

  useEffect(() => {
    requestUserPermission()
    NotificationListener()
  }, [])

  return (
      <View style={{flex: 1, backgroundColor:'blue'}}/>
  );
}

const styles = StyleSheet.create({
  light: {
    headerTitleStyle: {
      color: "black",
    },
    headerStyle:{
      backgroundColor:'white'
    }
  },
  dark: {
    headerTitleStyle: {
      color: "white",
    },
    headerStyle:{
      backgroundColor:'black'
    }
  }
})
export default App;