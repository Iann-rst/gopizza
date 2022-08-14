import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';

import { StatusBar } from 'expo-status-bar'

import { AuthProvider } from '@hooks/auth';

import { Routes } from './src/routes';
import { Order } from '@screens/Order';
import { Orders } from '@screens/Orders';




SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          DMSans_400Regular,
          DMSerifDisplay_400Regular
        })
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady])


  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
