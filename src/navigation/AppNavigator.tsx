import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Import Screens
import HomeScreen from '../screens/Home/HomeScreen';
import SurahListScreen from '../screens/Quran/SurahListScreen';
import SurahDetailScreen from '../screens/Quran/SurahDetailScreen';
import JournalScreen from '../screens/Journal/JournalScreen';
import PlansScreen from '../screens/Plans/PlansScreen';

const Tab = createBottomTabNavigator();
const QuranStack = createNativeStackNavigator();

function QuranStackNavigator() {
  return (
    <QuranStack.Navigator screenOptions={{ headerShown: false }}>
      <QuranStack.Screen name="SurahList" component={SurahListScreen} />
      <QuranStack.Screen name="SurahDetail" component={SurahDetailScreen} />
    </QuranStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#134729', // primary
          tabBarInactiveTintColor: '#717971', // outline
          tabBarStyle: {
            backgroundColor: '#ffffff', // surface_lowest
            borderTopWidth: 0,
            elevation: 10,
          },
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
          }}
        />
        <Tab.Screen 
          name="QuranTab" 
          component={QuranStackNavigator} 
          options={{
            title: "Quran",
            tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />
          }}
        />
        <Tab.Screen 
          name="Journal" 
          component={JournalScreen} 
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="feather" size={24} color={color} />
          }}
        />
        <Tab.Screen 
          name="Plans" 
          component={PlansScreen} 
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar-check" size={24} color={color} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
