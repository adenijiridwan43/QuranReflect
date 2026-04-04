import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header Section */}
        <View className="px-6 pt-8 pb-6 flex-row justify-between items-start">
          <View>
            <Text className="text-primary-container text-2xl font-bold font-heading">
              As-Salamu Alaykum
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Jumada al-Akhirah 1447 • Friday
            </Text>
          </View>
          <View className="bg-secondary-container/20 px-3 py-1.5 rounded-full border border-secondary/20">
            <Text className="text-secondary text-xs font-semibold">
              Asr in 2h 15m
            </Text>
          </View>
        </View>

        {/* Today's Focus Card with Gradient & Shadow */}
        <View className="px-6 mb-8">
          <LinearGradient
            colors={['#2D5F3F', '#134729']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-3xl p-6 shadow-xl shadow-primary-container relative overflow-hidden"
          >
            {/* Soft Geometry Watermark (Mocked with opacity) */}
            <View className="absolute -right-10 -top-10 opacity-10">
              <MaterialCommunityIcons name="star-four-points-outline" size={120} color="#ffffff" />
            </View>

            <View className="flex-row items-center mb-4">
              <MaterialCommunityIcons name="book-open-page-variant" size={20} color="#b8efc6" />
              <Text className="text-primary-fixed ml-2 font-semibold tracking-wide uppercase text-xs">
                Today's Reading
              </Text>
            </View>

            <Text className="text-white text-2xl font-heading mb-1 shadow-sm">
              Surah Al-Baqarah
            </Text>
            <Text className="text-white/80 text-sm mb-6">Verse 255 (Ayatul Kursi)</Text>

            {/* Progress Bar */}
            <View className="h-1.5 bg-black/20 rounded-full overflow-hidden mb-4">
              <View className="w-1/3 h-full bg-secondary-fixed rounded-full" />
            </View>

            <TouchableOpacity className="bg-white/10 active:bg-white/20 py-3 rounded-xl border border-white/20 flex-row justify-center items-center">
              <Text className="text-white font-semibold">Continue Reading</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Quick Stats Grid */}
        <View className="px-6 mb-8 flex-row justify-between">
          <View className="flex-1 bg-surface-lowest rounded-2xl p-4 shadow-sm mr-4 items-center border border-surface-container">
            <MaterialCommunityIcons name="pen" size={24} color="#D4AF37" className="mb-2" />
            <Text className="text-xl font-bold text-on-surface">24</Text>
            <Text className="text-xs text-gray-500 mt-1">Reflections</Text>
          </View>

          <View className="flex-1 bg-surface-lowest rounded-2xl p-4 shadow-sm mr-4 items-center border border-surface-container">
            <FontAwesome5 name="fire" size={24} color="#E27D60" className="mb-2" />
            <Text className="text-xl font-bold text-on-surface">7 days</Text>
            <Text className="text-xs text-gray-500 mt-1">Streak</Text>
          </View>

          <View className="flex-1 bg-surface-lowest rounded-2xl p-4 shadow-sm items-center border border-surface-container">
            <Ionicons name="calendar" size={24} color="#4A90E2" className="mb-2" />
            <Text className="text-xl font-bold text-on-surface">5/30</Text>
            <Text className="text-xs text-gray-500 mt-1">Plan</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-bold text-on-surface mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity className="w-[48%] bg-surface-lowest rounded-2xl p-5 mb-4 shadow-sm border border-surface-container flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                <Ionicons name="book" size={20} color="#134729" />
              </View>
              <Text className="font-semibold text-on-surface flex-1">Browse Quran</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-surface-lowest rounded-2xl p-5 mb-4 shadow-sm border border-surface-container flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-secondary/10 items-center justify-center mr-3">
                <MaterialCommunityIcons name="book-edit" size={20} color="#735c00" />
              </View>
              <Text className="font-semibold text-on-surface flex-1">My Journal</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-surface-lowest rounded-2xl p-5 shadow-sm border border-surface-container flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-blue-500/10 items-center justify-center mr-3">
                <Ionicons name="map" size={20} color="#4A90E2" />
              </View>
              <Text className="font-semibold text-on-surface flex-1">Reading Plans</Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-[48%] bg-surface-lowest rounded-2xl p-5 shadow-sm border border-surface-container flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-purple-500/10 items-center justify-center mr-3">
                <Ionicons name="bookmark" size={20} color="#6C5CE7" />
              </View>
              <Text className="font-semibold text-on-surface flex-1">Bookmarks</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity Timeline */}
        <View className="px-6">
          <Text className="text-lg font-bold text-on-surface mb-4">Recent Activity</Text>
          <View className="bg-surface-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
            
            {/* Timeline Item 1 */}
            <View className="flex-row p-4 border-l-4 border-l-[#85CDCA] border-b border-b-surface-container">
              <View className="flex-1">
                <Text className="text-on-surface font-semibold mb-1">Reflection on Al-Ikhlas</Text>
                <Text className="text-gray-500 text-xs">2 hours ago</Text>
              </View>
              <View className="bg-[#85CDCA]/20 px-3 py-1 rounded-full justify-center">
                <Text className="text-[#3b8784] text-xs font-semibold">Peace</Text>
              </View>
            </View>

            {/* Timeline Item 2 */}
            <View className="flex-row p-4 border-l-4 border-l-[#E27D60]">
              <View className="flex-1">
                <Text className="text-on-surface font-semibold mb-1">Completed Theme: Prophets</Text>
                <Text className="text-gray-500 text-xs">Yesterday</Text>
              </View>
              <View className="bg-[#E27D60]/20 px-3 py-1 rounded-full justify-center">
                <Text className="text-[#a84c32] text-xs font-semibold">Grateful</Text>
              </View>
            </View>
            
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
