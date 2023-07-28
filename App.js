import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Home';
import DetailsScreen from './Screens/Details'

import { useState, useRef, useEffect } from 'react'
import { useColorScheme, StyleSheet } from 'react-native';

import { requestUserPermission, NotificationListener, GetFCMToken, checkToken, getFCMToken } from "./utils/pushnotification_helper"

const Stack = createNativeStackNavigator();

function App() {
  const theme = useColorScheme()

  useEffect(() => {
    requestUserPermission()
    NotificationListener()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EOTC Calendar">
        <Stack.Screen options={theme == 'light' ? styles.light : styles.dark} name="Orthodox Tewahedo Calendar" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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