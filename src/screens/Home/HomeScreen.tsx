import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.flex1} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>As-Salamu Alaykum</Text>
            <Text style={styles.dateText}>Jumada al-Akhirah 1447 • Friday</Text>
          </View>
          <View style={styles.prayerBadge}>
            <Text style={styles.prayerText}>Asr in 2h 15m</Text>
          </View>
        </View>

        {/* Today's Focus Card */}
        <View style={styles.sectionPadding}>
          <LinearGradient
            colors={['#2D5F3F', '#134729']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.focusCard}
          >
            <View style={styles.watermark}>
              <MaterialCommunityIcons name="star-four-points-outline" size={120} color="#ffffff" />
            </View>

            <View style={styles.row}>
              <MaterialCommunityIcons name="book-open-page-variant" size={20} color="#b8efc6" />
              <Text style={styles.focusLabel}>TODAY'S READING</Text>
            </View>

            <Text style={styles.focusTitle}>Surah Al-Baqarah</Text>
            <Text style={styles.focusSubtitle}>Verse 255 (Ayatul Kursi)</Text>

            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>

            <TouchableOpacity 
              style={styles.continueBtn} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('QuranTab', { screen: 'SurahDetail', params: { surahId: 2, surahName: 'Al-Baqarah' }})}
            >
              <Text style={styles.continueBtnText}>Continue Reading</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={{ marginBottom: 8 }}>
              <MaterialCommunityIcons name="pen" size={24} color="#D4AF37" />
            </View>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Reflections</Text>
          </View>

          <View style={[styles.statCard, { marginHorizontal: 12 }]}>
            <View style={{ marginBottom: 8 }}>
              <FontAwesome5 name="fire" size={24} color="#E27D60" />
            </View>
            <Text style={styles.statNumber}>7 days</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>

          <View style={styles.statCard}>
            <View style={{ marginBottom: 8 }}>
              <Ionicons name="calendar" size={24} color="#4A90E2" />
            </View>
            <Text style={styles.statNumber}>5/30</Text>
            <Text style={styles.statLabel}>Plan</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionPadding}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('QuranTab')}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(19,71,41,0.1)' }]}>
                <Ionicons name="book" size={20} color="#134729" />
              </View>
              <Text style={styles.actionText}>Browse Quran</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Journal')}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(115,92,0,0.1)' }]}>
                <MaterialCommunityIcons name="book-edit" size={20} color="#735c00" />
              </View>
              <Text style={styles.actionText}>My Journal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Plans')}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(74,144,226,0.1)' }]}>
                <Ionicons name="map" size={20} color="#4A90E2" />
              </View>
              <Text style={styles.actionText}>Reading Plans</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Journal')}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(108,92,231,0.1)' }]}>
                <Ionicons name="bookmark" size={20} color="#6C5CE7" />
              </View>
              <Text style={styles.actionText}>Bookmarks</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity Timeline */}
        <View style={styles.sectionPadding}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.timelineContainer}>
            
            <View style={[styles.timelineItem, { borderLeftColor: '#85CDCA', borderBottomWidth: 1, borderBottomColor: '#edeeef' }]}>
              <View style={styles.flex1}>
                <Text style={styles.timelineTitle}>Reflection on Al-Ikhlas</Text>
                <Text style={styles.timelineDate}>2 hours ago</Text>
              </View>
              <View style={[styles.emotionBadge, { backgroundColor: 'rgba(133,205,202,0.2)' }]}>
                <Text style={[styles.emotionText, { color: '#3b8784' }]}>Peace</Text>
              </View>
            </View>

            <View style={[styles.timelineItem, { borderLeftColor: '#E27D60' }]}>
              <View style={styles.flex1}>
                <Text style={styles.timelineTitle}>Completed Theme: Prophets</Text>
                <Text style={styles.timelineDate}>Yesterday</Text>
              </View>
              <View style={[styles.emotionBadge, { backgroundColor: 'rgba(226,125,96,0.2)' }]}>
                <Text style={[styles.emotionText, { color: '#a84c32' }]}>Grateful</Text>
              </View>
            </View>
            
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  flex1: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },

  // Header
  header: {
    paddingHorizontal: 24, paddingTop: 32, paddingBottom: 24,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
  },
  greeting: { color: '#2D5F3F', fontSize: 24, fontWeight: 'bold' },
  dateText: { color: '#9ca3af', fontSize: 14, marginTop: 4 },
  prayerBadge: {
    backgroundColor: 'rgba(254,214,91,0.2)', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 999, borderWidth: 1, borderColor: 'rgba(115,92,0,0.2)',
  },
  prayerText: { color: '#735c00', fontSize: 12, fontWeight: '600' },

  // Focus Card
  sectionPadding: { paddingHorizontal: 24, marginBottom: 32 },
  focusCard: {
    borderRadius: 24, padding: 24, overflow: 'hidden',
    elevation: 8, shadowColor: '#2D5F3F', shadowOpacity: 0.3, shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  watermark: { position: 'absolute', right: -40, top: -40, opacity: 0.1 },
  focusLabel: { color: '#b8efc6', marginLeft: 8, fontWeight: '600', letterSpacing: 1.5, fontSize: 12 },
  focusTitle: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  focusSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 24 },
  progressBar: { height: 6, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 999, overflow: 'hidden', marginBottom: 16 },
  progressFill: { width: '33%', height: '100%', backgroundColor: '#ffe088', borderRadius: 999 },
  continueBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 12, borderRadius: 12,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  continueBtnText: { color: '#ffffff', fontWeight: '600' },

  // Stats
  statsRow: { paddingHorizontal: 24, marginBottom: 32, flexDirection: 'row', justifyContent: 'space-between' },
  statCard: {
    flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#edeeef', elevation: 1,
  },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#191c1d' },
  statLabel: { fontSize: 12, color: '#9ca3af', marginTop: 4 },

  // Actions
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#191c1d', marginBottom: 16 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionCard: {
    width: '48%', backgroundColor: '#ffffff', borderRadius: 16, padding: 20, marginBottom: 12,
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#edeeef', elevation: 1,
  },
  actionIcon: {
    width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  actionText: { fontWeight: '600', color: '#191c1d', flex: 1 },

  // Timeline
  timelineContainer: {
    backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#edeeef',
    overflow: 'hidden', elevation: 1,
  },
  timelineItem: {
    flexDirection: 'row', padding: 16, borderLeftWidth: 4,
  },
  timelineTitle: { color: '#191c1d', fontWeight: '600', marginBottom: 4 },
  timelineDate: { color: '#9ca3af', fontSize: 12 },
  emotionBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, justifyContent: 'center' },
  emotionText: { fontSize: 12, fontWeight: '600' },
});
