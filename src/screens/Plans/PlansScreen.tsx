import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlansScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.flex1} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Reading Journeys</Text>
          <Text style={styles.subtitle}>Curated paths to connect with the divine.</Text>
        </View>

        {/* Active Journey Card */}
        <View style={styles.activeSection}>
          <Text style={styles.sectionTitle}>Continue Journey</Text>
          <LinearGradient
            colors={['#735c00', '#4a3b00']}
            style={styles.journeyCard}
          >
            <View style={styles.watermark}>
              <Ionicons name="moon" size={140} color="#ffffff" />
            </View>

            <View style={styles.dayBadge}>
              <MaterialCommunityIcons name="clock-outline" size={14} color="#ffe088" />
              <Text style={styles.dayText}>Day 12 of 30</Text>
            </View>

            <Text style={styles.journeyTitle}>Ramadan Preparation</Text>
            <Text style={styles.journeyDesc}>
              Read passages focused on Taqwa, patience, and character building ahead of the holy month.
            </Text>

            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>

            <View style={styles.journeyFooter}>
              <Text style={styles.progressLabel}>40% Completed</Text>
              <TouchableOpacity style={styles.readBtn}>
                <Text style={styles.readBtnText}>Read Today's Portions</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Thematic Collections */}
        <View style={styles.themesSection}>
          <Text style={styles.sectionTitle}>Thematic Collections</Text>
          
          <View style={styles.themesGrid}>
            <TouchableOpacity style={styles.themeCard}>
              <View style={[styles.themeIcon, { backgroundColor: 'rgba(133,205,202,0.2)' }]}>
                <Ionicons name="water" size={24} color="#3b8784" />
              </View>
              <Text style={styles.themeName}>Patience</Text>
              <Text style={styles.themeMeta}>7 Days • 14 Verses</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.themeCard}>
              <View style={[styles.themeIcon, { backgroundColor: 'rgba(226,125,96,0.2)' }]}>
                <MaterialCommunityIcons name="heart-pulse" size={24} color="#a84c32" />
              </View>
              <Text style={styles.themeName}>Healing</Text>
              <Text style={styles.themeMeta}>10 Days • 25 Verses</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.themeCard}>
              <View style={[styles.themeIcon, { backgroundColor: 'rgba(108,92,231,0.2)' }]}>
                <Ionicons name="star" size={24} color="#4539a6" />
              </View>
              <Text style={styles.themeName}>Prophets</Text>
              <Text style={styles.themeMeta}>14 Days • 40 Verses</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.themeCard}>
              <View style={[styles.themeIcon, { backgroundColor: 'rgba(212,175,55,0.2)' }]}>
                <MaterialCommunityIcons name="shield-sun" size={24} color="#a48624" />
              </View>
              <Text style={styles.themeName}>Protection</Text>
              <Text style={styles.themeMeta}>5 Days • 10 Verses</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  flex1: { flex: 1 },

  // Header
  header: {
    paddingHorizontal: 24, paddingVertical: 24,
    borderBottomWidth: 1, borderBottomColor: '#edeeef',
    backgroundColor: '#f8f9fa', elevation: 2,
  },
  pageTitle: { fontSize: 30, fontWeight: 'bold', color: '#2D5F3F', marginBottom: 4 },
  subtitle: { color: '#9ca3af', fontSize: 14 },

  // Active Journey
  activeSection: { paddingHorizontal: 24, marginTop: 32, marginBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#191c1d', marginBottom: 16 },
  journeyCard: {
    borderRadius: 24, padding: 24, overflow: 'hidden',
    elevation: 8, shadowColor: '#735c00', shadowOpacity: 0.3, shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  watermark: { position: 'absolute', right: -40, top: -40, opacity: 0.1 },
  dayBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999,
    marginBottom: 16, flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  dayText: { color: '#ffe088', fontSize: 12, fontWeight: '600', marginLeft: 4 },
  journeyTitle: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  journeyDesc: {
    color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 24, lineHeight: 22,
  },
  progressBar: {
    height: 6, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 999,
    overflow: 'hidden', marginBottom: 16,
  },
  progressFill: { width: '40%', height: '100%', backgroundColor: '#ffe088', borderRadius: 999 },
  journeyFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  progressLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' },
  readBtn: {
    backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 12, elevation: 2,
  },
  readBtnText: { color: '#735c00', fontWeight: 'bold', fontSize: 14 },

  // Themes
  themesSection: { paddingHorizontal: 24 },
  themesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  themeCard: {
    width: '48%', backgroundColor: '#ffffff', borderRadius: 16, padding: 20, marginBottom: 12,
    borderWidth: 1, borderColor: '#edeeef', elevation: 2,
  },
  themeIcon: {
    width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  themeName: { fontWeight: 'bold', color: '#191c1d', fontSize: 18, marginBottom: 4 },
  themeMeta: { color: '#9ca3af', fontSize: 12 },
});
