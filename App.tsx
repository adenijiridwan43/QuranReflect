import { StatusBar } from 'expo-status-bar';
import React, { Suspense } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SQLiteProvider } from 'expo-sqlite';
import AppNavigator from './src/navigation/AppNavigator';

function LoadingPlaceholder() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#134729" />
      <Text style={styles.loadingText}>Initializing Library...</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Suspense fallback={<LoadingPlaceholder />}>
        <SQLiteProvider databaseName="quran.db" assetSource={{ assetId: require('./assets/quran.db') }}>
          <AppNavigator />
        </SQLiteProvider>
      </Suspense>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F7F3',
  },
  loadingText: {
    marginTop: 16,
    fontFamily: 'Inter-Medium',
    color: '#134729',
  },
});
