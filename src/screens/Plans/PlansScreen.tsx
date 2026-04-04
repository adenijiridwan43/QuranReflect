import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlansScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header */}
        <View className="px-6 py-6 border-b border-surface-container bg-surface shadow-sm z-10">
          <Text className="text-3xl font-bold font-heading text-primary-container mb-1">
            Reading Journeys
          </Text>
          <Text className="text-gray-500 text-sm">
            Curated paths to connect with the divine.
          </Text>
        </View>

        {/* Active Journey Card */}
        <View className="px-6 mt-8 mb-10">
          <Text className="text-lg font-bold text-on-surface mb-4">Continue Journey</Text>
          <LinearGradient
            colors={['#735c00', '#4a3b00']}
            className="rounded-3xl p-6 shadow-xl relative overflow-hidden"
          >
            <View className="absolute -right-10 -top-10 opacity-10">
              <Ionicons name="moon" size={140} color="#ffffff" />
            </View>

            <View className="bg-white/10 self-start px-3 py-1 rounded-full border border-white/20 mb-4 flex-row items-center">
              <MaterialCommunityIcons name="clock-outline" size={14} color="#ffe088" />
              <Text className="text-secondary-fixed text-xs font-semibold ml-1">Day 12 of 30</Text>
            </View>

            <Text className="text-white text-2xl font-heading mb-2">Ramadan Preparation</Text>
            <Text className="text-white/80 text-sm mb-6 leading-relaxed">
              Read passages focused on Taqwa, patience, and character building ahead of the holy month.
            </Text>

            <View className="h-1.5 bg-black/20 rounded-full overflow-hidden mb-4">
              <View className="w-[40%] h-full bg-secondary-fixed rounded-full" />
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-white/80 text-xs font-semibold">40% Completed</Text>
              <TouchableOpacity className="bg-white px-5 py-2.5 rounded-xl shadow-sm">
                <Text className="text-secondary font-bold text-sm">Read Today's Portions</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Thematic Collections */}
        <View className="px-6">
          <Text className="text-lg font-bold text-on-surface mb-4">Thematic Collections</Text>
          
          <View className="flex-row flex-wrap justify-between">
            {/* Theme 1 */}
            <TouchableOpacity className="w-[48%] bg-surface-lowest rounded-2xl p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-surface-container">
              <View className="w-12 h-12 rounded-full bg-[#85CDCA]/20 items-center justify-center mb-3">
                <Ionicons name="water" size={24} color="#3b8784" />
              </View>
              <Text className="font-bold text-on-surface text-lg mb-1">Patience</Text>
              <Text className="text-gray-500 text-xs">7 Days • 14 Verses</Text>
            </TouchableOpacity>

            {/* Theme 2 */}
            <TouchableOpacity className="w-[48%] bg-surface-lowest rounded-2xl p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-surface-container">
              <View className="w-12 h-12 rounded-full bg-[#E27D60]/20 items-center justify-center mb-3">
                <MaterialCommunityIcons name="heart-pulse" size={24} color="#a84c32" />
              </View>
              <Text className="font-bold text-on-surface text-lg mb-1">Healing</Text>
              <Text className="text-gray-500 text-xs">10 Days • 25 Verses</Text>
            </TouchableOpacity>

            {/* Theme 3 */}
            <TouchableOpacity className="w-[48%] bg-surface-lowest rounded-2xl p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-surface-container">
              <View className="w-12 h-12 rounded-full bg-[#6C5CE7]/20 items-center justify-center mb-3">
                <Ionicons name="star" size={24} color="#4539a6" />
              </View>
              <Text className="font-bold text-on-surface text-lg mb-1">Prophets</Text>
              <Text className="text-gray-500 text-xs">14 Days • 40 Verses</Text>
            </TouchableOpacity>

            {/* Theme 4 */}
            <TouchableOpacity className="w-[48%] bg-surface-lowest rounded-2xl p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-surface-container">
              <View className="w-12 h-12 rounded-full bg-[#D4AF37]/20 items-center justify-center mb-3">
                <MaterialCommunityIcons name="shield-sun" size={24} color="#a48624" />
              </View>
              <Text className="font-bold text-on-surface text-lg mb-1">Protection</Text>
              <Text className="text-gray-500 text-xs">5 Days • 10 Verses</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
