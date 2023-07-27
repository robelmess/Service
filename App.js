import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Home';
import DetailsScreen from './Screens/Details'

import { useState, useRef, useEffect } from 'react'
import { requestUserPermission, NotificationListener, GetFCMToken, checkToken, getFCMToken } from "./utils/pushnotification_helper"

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    requestUserPermission()
    NotificationListener()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EOTC Calendar">
        <Stack.Screen name="Tewahedo Calendar" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;