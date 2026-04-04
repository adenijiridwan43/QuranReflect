import './global.css';
import { StatusBar } from 'expo-status-bar';
import React, { Suspense } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SQLiteProvider } from 'expo-sqlite';
import AppNavigator from './src/navigation/AppNavigator';

function LoadingPlaceholder() {
  return (
    <View className="flex-1 items-center justify-center bg-[#F9F7F3]">
      <ActivityIndicator size="large" color="#134729" />
      <Text className="mt-4 font-[Inter-Medium] text-[#134729]">Initializing Library...</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Suspense fallback={<LoadingPlaceholder />}>
        <SQLiteProvider databaseName="quran.db" assetSource={{ assetId: require('./assets/quran.db') }}>
          <AppNavigator />
        </SQLiteProvider>
      </Suspense>
    </SafeAreaProvider>
  );
}
