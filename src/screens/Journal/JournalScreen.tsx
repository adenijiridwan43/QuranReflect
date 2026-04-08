import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from 'expo-vector-icons';

const EMOTIONS = [
  { id: 'peace', label: 'Peace', color: '#85CDCA' },
  { id: 'gratitude', label: 'Grateful', color: '#D4AF37' },
  { id: 'reflection', label: 'Reflective', color: '#8892B0' },
  { id: 'awe', label: 'Awe', color: '#E27D60' },
  { id: 'hope', label: 'Hope', color: '#6C5CE7' },
];

export default function JournalScreen() {
  const [reflection, setReflection] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('peace');

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
          
          {/* Header */}
          <View className="px-6 py-8 border-b border-surface-container bg-surface shadow-sm z-10">
            <Text className="text-3xl font-bold font-heading text-primary-container mb-2">
              My Reflections
            </Text>
            <Text className="text-gray-500 text-sm">
              "And He found you lost and guided [you]." (93:7)
            </Text>
          </View>

          {/* New Entry Card */}
          <View className="px-6 mt-8">
            <View className="bg-surface-lowest rounded-3xl p-6 shadow-sm border border-surface-container">
              <View className="flex-row items-center mb-4">
                <MaterialCommunityIcons name="feather" size={20} color="#134729" />
                <Text className="text-primary-container font-bold text-sm tracking-widest uppercase ml-2">New Entry</Text>
              </View>

              <TextInput
                multiline
                numberOfLines={6}
                placeholder="What is your heart reflecting upon today?"
                placeholderTextColor="#A0AAB2"
                className="text-lg text-on-surface font-reading leading-relaxed p-0 mb-6"
                style={{ textAlignVertical: 'top', minHeight: 120 }}
                value={reflection}
                onChangeText={setReflection}
              />

              {/* Emotion Chips */}
              <Text className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">
                How does this verse make you feel?
              </Text>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 flex-row">
                {EMOTIONS.map(emotion => {
                  const isSelected = selectedEmotion === emotion.id;
                  return (
                    <TouchableOpacity
                      key={emotion.id}
                      onPress={() => setSelectedEmotion(emotion.id)}
                      className="px-4 py-2 rounded-full mr-3 border"
                      style={{
                        backgroundColor: isSelected ? `${emotion.color}33` : '#ffffff',
                        borderColor: isSelected ? emotion.color : '#e1e3e4',
                      }}
                    >
                      <Text 
                        className="font-semibold"
                        style={{ color: isSelected ? emotion.color : '#717971' }}
                      >
                        {emotion.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View className="flex-row justify-between items-center">
                <TouchableOpacity className="flex-row items-center bg-surface-container px-4 py-2 rounded-xl">
                  <Ionicons name="link" size={16} color="#717971" />
                  <Text className="text-gray-500 font-semibold ml-2 text-sm">Link Verse</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="bg-primary-container px-6 py-3 rounded-xl shadow-sm"
                  onPress={() => setReflection('')}
                >
                  <Text className="text-white font-bold text-sm tracking-wide">Save Entry</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Past Reflections Summary */}
          <View className="px-6 mt-10">
            <Text className="text-lg font-bold text-on-surface mb-4">Past Reflections</Text>
            
            <View className="bg-surface-lowest rounded-2xl p-5 mb-4 border border-surface-container shadow-sm border-l-4 border-l-[#D4AF37]">
              <View className="flex-row justify-between mb-2">
                <Text className="text-xs text-gray-500 font-semibold">Al-Baqarah 2:286</Text>
                <Text className="text-xs text-gray-400">June 5</Text>
              </View>
              <Text className="text-on-surface font-reading text-base leading-relaxed mb-3">
                Allah does not burden a soul beyond that it can bear. This reminds me to stay patient through recent hardships.
              </Text>
              <View className="flex-row">
                <View className="bg-[#D4AF37]/20 px-3 py-1 rounded-full">
                  <Text className="text-[#a48624] text-xs font-semibold">Grateful</Text>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
