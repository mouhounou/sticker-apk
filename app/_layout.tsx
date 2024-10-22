import { Stack } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen'


SplashScreen.preventAutoHideAsync()
setTimeout(SplashScreen.hideAsync, 5000)

export default function RootLayout() {
  useEffect(() =>{
    setTimeout(() =>{
      setStatusBarStyle("light")
    }, 0)
  },[])

  return (
    <GestureHandlerRootView style = {{flex : 1}}>
      <StatusBar style='light'/>
      <Stack>
        <Stack.Screen
              name = "(tabs)" 
              options = {{ 
                  headerShown: false 
                }} />
      </Stack>
    </GestureHandlerRootView>
  );
}


import { StatusBar } from "expo-status-bar";

