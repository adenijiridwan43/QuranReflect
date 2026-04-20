import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
      >
        <ScrollView style={styles.flex1} contentContainerStyle={{ paddingBottom: 40 }}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.pageTitle}>My Reflections</Text>
            <Text style={styles.subtitle}>
              "And He found you lost and guided [you]." (93:7)
            </Text>
          </View>

          {/* New Entry Card */}
          <View style={styles.entrySection}>
            <View style={styles.entryCard}>
              <View style={styles.row}>
                <MaterialCommunityIcons name="feather" size={20} color="#134729" />
                <Text style={styles.entryLabel}>NEW ENTRY</Text>
              </View>

              <TextInput
                multiline
                numberOfLines={6}
                placeholder="What is your heart reflecting upon today?"
                placeholderTextColor="#A0AAB2"
                style={styles.textInput}
                value={reflection}
                onChangeText={setReflection}
              />

              {/* Emotion Chips */}
              <Text style={styles.emotionPrompt}>
                HOW DOES THIS VERSE MAKE YOU FEEL?
              </Text>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
                {EMOTIONS.map(emotion => {
                  const isSelected = selectedEmotion === emotion.id;
                  return (
                    <TouchableOpacity
                      key={emotion.id}
                      onPress={() => setSelectedEmotion(emotion.id)}
                      style={[
                        styles.emotionChip,
                        {
                          backgroundColor: isSelected ? `${emotion.color}33` : '#ffffff',
                          borderColor: isSelected ? emotion.color : '#e1e3e4',
                        },
                      ]}
                    >
                      <Text style={[
                        styles.emotionChipText,
                        { color: isSelected ? emotion.color : '#717971' },
                      ]}>
                        {emotion.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={styles.entryActions}>
                <TouchableOpacity style={styles.linkBtn}>
                  <Ionicons name="link" size={16} color="#717971" />
                  <Text style={styles.linkBtnText}>Link Verse</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.saveBtn}
                  onPress={() => setReflection('')}
                >
                  <Text style={styles.saveBtnText}>Save Entry</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Past Reflections */}
          <View style={styles.pastSection}>
            <Text style={styles.sectionTitle}>Past Reflections</Text>
            
            <View style={styles.pastCard}>
              <View style={styles.pastHeader}>
                <Text style={styles.pastRef}>Al-Baqarah 2:286</Text>
                <Text style={styles.pastDate}>June 5</Text>
              </View>
              <Text style={styles.pastText}>
                Allah does not burden a soul beyond that it can bear. This reminds me to stay patient through recent hardships.
              </Text>
              <View style={styles.row}>
                <View style={styles.pastBadge}>
                  <Text style={styles.pastBadgeText}>Grateful</Text>
                </View>
              </View>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  flex1: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },

  // Header
  header: {
    paddingHorizontal: 24, paddingVertical: 32,
    borderBottomWidth: 1, borderBottomColor: '#edeeef',
    backgroundColor: '#f8f9fa', elevation: 2,
  },
  pageTitle: { fontSize: 30, fontWeight: 'bold', color: '#2D5F3F', marginBottom: 8 },
  subtitle: { color: '#9ca3af', fontSize: 14 },

  // Entry
  entrySection: { paddingHorizontal: 24, marginTop: 32 },
  entryCard: {
    backgroundColor: '#ffffff', borderRadius: 24, padding: 24,
    borderWidth: 1, borderColor: '#edeeef', elevation: 2,
  },
  entryLabel: {
    color: '#2D5F3F', fontWeight: 'bold', fontSize: 12,
    letterSpacing: 2, marginLeft: 8, marginBottom: 16,
  },
  textInput: {
    fontSize: 18, color: '#191c1d', lineHeight: 28, padding: 0,
    marginBottom: 24, textAlignVertical: 'top', minHeight: 120,
  },
  emotionPrompt: {
    fontSize: 12, color: '#9ca3af', fontWeight: '600',
    letterSpacing: 1, marginBottom: 12,
  },
  emotionChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999,
    marginRight: 12, borderWidth: 1,
  },
  emotionChipText: { fontWeight: '600' },

  entryActions: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  linkBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#edeeef', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12,
  },
  linkBtnText: { color: '#9ca3af', fontWeight: '600', marginLeft: 8, fontSize: 14 },
  saveBtn: {
    backgroundColor: '#2D5F3F', paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 12, elevation: 2,
  },
  saveBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14, letterSpacing: 0.5 },

  // Past
  pastSection: { paddingHorizontal: 24, marginTop: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#191c1d', marginBottom: 16 },
  pastCard: {
    backgroundColor: '#ffffff', borderRadius: 16, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: '#edeeef', elevation: 1,
    borderLeftWidth: 4, borderLeftColor: '#D4AF37',
  },
  pastHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8,
  },
  pastRef: { fontSize: 12, color: '#9ca3af', fontWeight: '600' },
  pastDate: { fontSize: 12, color: '#d1d5db' },
  pastText: { color: '#191c1d', fontSize: 16, lineHeight: 24, marginBottom: 12 },
  pastBadge: {
    backgroundColor: 'rgba(212,175,55,0.2)',
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999,
  },
  pastBadgeText: { fontSize: 12, fontWeight: '600', color: '#a48624' },
});
