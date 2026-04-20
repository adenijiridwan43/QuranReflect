import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Switch, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useSQLiteContext } from 'expo-sqlite';
import { useAudioStore, AVAILABLE_RECITERS, Reciter } from '../../store/useAudioStore';

export default function SurahDetailScreen({ route, navigation }: any) {
  const [showTranslation, setShowTranslation] = useState(true);
  const [verses, setVerses] = useState<any[]>([]);
  const [surahData, setSurahData] = useState<any>(null);
  const [showReciterModal, setShowReciterModal] = useState(false);
  const [isDownloadedLocally, setIsDownloadedLocally] = useState(false);

  const db = useSQLiteContext();
  const surahId = route?.params?.surahId || 1;
  const passedSurahName = route?.params?.surahName || '';
  
  const { 
    selectedReciter, setReciter, 
    playingSurahId, isPlaying, isDownloading, downloadProgress,
    playSurah, pauseSurah, checkIfDownloaded, downloadSurah 
  } = useAudioStore();

  React.useEffect(() => {
    async function loadData() {
      const [surah] = await db.getAllAsync(`SELECT * FROM surahs WHERE id = ?`, [surahId]);
      const versesData = await db.getAllAsync(`SELECT * FROM verses WHERE surah_number = ? ORDER BY verse_number ASC`, [surahId]);
      
      setSurahData(surah);
      setVerses(versesData);
      
      const downloaded = await checkIfDownloaded(surahId, selectedReciter.id);
      setIsDownloadedLocally(downloaded);
    }
    loadData();
  }, [surahId, db, selectedReciter]);

  const handlePlayToggle = async () => {
    if (isPlaying && playingSurahId === surahId) {
      await pauseSurah();
    } else {
      await playSurah(surahId);
    }
  };

  const handleDownload = async () => {
    await downloadSurah(surahId);
    setIsDownloadedLocally(true);
  };

  const surahName = surahData?.name_english || passedSurahName;

  return (
    <SafeAreaView style={styles.container}>
      {/* Dynamic Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#134729" />
        </TouchableOpacity>
        
        <Text style={styles.topBarTitle}>{surahName}</Text>

        <TouchableOpacity style={styles.iconBtn} onPress={() => setShowReciterModal(true)}>
          <Ionicons name="headset-outline" size={20} color="#134729" />
        </TouchableOpacity>
      </View>

      {/* Actions Bar */}
      <View style={styles.actionsBar}>
        <View style={styles.row}>
          <Text style={styles.toggleLabel}>EN</Text>
          <Switch 
            value={showTranslation} 
            onValueChange={setShowTranslation}
            trackColor={{ false: '#d9dadb', true: '#b8efc6' }}
            thumbColor={showTranslation ? '#134729' : '#f8f9fa'}
          />
        </View>

        <View style={styles.row}>
          {isDownloading ? (
            <View style={styles.downloadBadge}>
              <ActivityIndicator size="small" color="#134729" />
              <Text style={styles.downloadText}>{(downloadProgress * 100).toFixed(0)}%</Text>
            </View>
          ) : isDownloadedLocally ? (
            <View style={styles.downloadedBadge}>
              <Ionicons name="checkmark-done" size={16} color="#735c00" />
            </View>
          ) : (
            <TouchableOpacity onPress={handleDownload} style={styles.downloadBtn}>
              <Ionicons name="cloud-download-outline" size={16} color="#134729" />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.playBtn} onPress={handlePlayToggle}>
            <Ionicons name={isPlaying && playingSurahId === surahId ? "pause" : "play"} size={16} color="#ffffff" />
            <Text style={styles.playBtnText}>
              {isPlaying && playingSurahId === surahId ? "Pause" : "Listen"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.flex1} contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}>
        {/* Surah Header */}
        <View style={styles.surahHeader}>
          <View style={styles.ornamentCircle}>
            <MaterialCommunityIcons name="ornament" size={32} color="#735c00" />
          </View>
          <Text style={styles.arabicTitle}>{surahData?.name_arabic || ''}</Text>
          <Text style={styles.surahMeta}>
            {surahData?.revelation_type || '...'} • {surahData?.verses_count || '0'} Verses
          </Text>
        </View>

        {/* Bismillah */}
        {surahId !== 1 && surahId !== 9 && (
          <View style={styles.bismillahSection}>
            <Text style={styles.bismillahArabic}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </Text>
            {showTranslation && (
              <Text style={styles.bismillahTranslation}>
                In the name of Allah, the Entirely Merciful, the Especially Merciful.
              </Text>
            )}
          </View>
        )}

        {/* Verses */}
        {verses.map((verse) => (
          <View key={verse.id} style={styles.verseContainer}>
            <View style={styles.verseHeader}>
              <View style={styles.verseNumBadge}>
                <Text style={styles.verseNumText}>{verse.verse_number}</Text>
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={{ marginLeft: 16 }}>
                  <Ionicons name="bookmark-outline" size={20} color="#717971" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 16 }}>
                  <MaterialCommunityIcons name="feather" size={20} color="#717971" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 16 }}>
                  <Ionicons name="share-outline" size={20} color="#717971" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.verseArabic}>{verse.text_uthmani}</Text>
            
            {showTranslation && (
              <Text style={styles.verseTranslation}>{verse.translation_saheeh}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Reciter Modal */}
      <Modal visible={showReciterModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Reciter</Text>
              <TouchableOpacity onPress={() => setShowReciterModal(false)}>
                <Ionicons name="close" size={24} color="#134729" />
              </TouchableOpacity>
            </View>
            
            {AVAILABLE_RECITERS.map((reciter) => {
              const isActive = selectedReciter.id === reciter.id;
              return (
                <TouchableOpacity
                  key={reciter.id}
                  style={[
                    styles.reciterOption,
                    isActive && styles.reciterOptionActive,
                  ]}
                  onPress={() => {
                    setReciter(reciter);
                    setShowReciterModal(false);
                  }}
                >
                  <View>
                    <Text style={styles.reciterName}>{reciter.name}</Text>
                    <Text style={styles.reciterStyle}>{reciter.style}</Text>
                  </View>
                  {isActive && (
                    <Ionicons name="checkmark-circle" size={24} color="#134729" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  flex1: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },

  // Top bar
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#f8f9fa',
    borderBottomWidth: 1, borderBottomColor: '#edeeef', elevation: 2,
  },
  iconBtn: {
    padding: 8, borderRadius: 20, width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#edeeef',
  },
  topBarTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D5F3F' },

  // Actions bar
  actionsBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingVertical: 16, backgroundColor: '#ffffff',
  },
  toggleLabel: { color: '#191c1d', fontWeight: '600', marginRight: 12 },

  downloadBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#edeeef',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
  },
  downloadText: { fontSize: 12, color: '#134729', fontWeight: 'bold', marginLeft: 8 },
  downloadedBadge: {
    padding: 8, backgroundColor: 'rgba(115,92,0,0.2)', borderRadius: 999,
  },
  downloadBtn: {
    padding: 8, backgroundColor: '#edeeef', borderRadius: 999,
  },
  playBtn: {
    backgroundColor: '#134729', paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 999, flexDirection: 'row', alignItems: 'center', marginLeft: 12,
  },
  playBtnText: { color: '#ffffff', fontWeight: 'bold', marginLeft: 8 },

  // Surah header
  surahHeader: {
    alignItems: 'center', paddingVertical: 32, marginBottom: 24,
    borderBottomWidth: 1, borderBottomColor: 'rgba(237,238,239,0.5)',
  },
  ornamentCircle: {
    width: 64, height: 64, backgroundColor: 'rgba(115,92,0,0.1)',
    borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  arabicTitle: {
    fontSize: 30, fontWeight: 'bold', color: '#2D5F3F', marginBottom: 8,
    writingDirection: 'rtl',
  },
  surahMeta: {
    color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, fontWeight: '600',
  },

  // Bismillah
  bismillahSection: {
    alignItems: 'center', marginBottom: 40, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: '#edeeef',
  },
  bismillahArabic: {
    fontSize: 30, color: '#134729', marginBottom: 12, textAlign: 'center',
    lineHeight: 48, writingDirection: 'rtl',
  },
  bismillahTranslation: {
    color: '#9ca3af', textAlign: 'center', fontStyle: 'italic', paddingHorizontal: 16,
  },

  // Verses
  verseContainer: {
    marginBottom: 32, paddingLeft: 16, paddingVertical: 4,
    borderLeftWidth: 2, borderLeftColor: 'rgba(19,71,41,0.2)',
  },
  verseHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
  },
  verseNumBadge: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#edeeef',
    alignItems: 'center', justifyContent: 'center',
  },
  verseNumText: { color: '#2D5F3F', fontWeight: 'bold', fontSize: 12 },
  verseArabic: {
    fontSize: 30, textAlign: 'right', color: '#191c1d', marginBottom: 16,
    lineHeight: 60, writingDirection: 'rtl',
  },
  verseTranslation: {
    fontSize: 18, textAlign: 'left', color: 'rgba(25,28,29,0.8)',
    lineHeight: 28, backgroundColor: '#ffffff', padding: 12, borderRadius: 8, marginTop: 8,
  },

  // Modal
  modalOverlay: {
    flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#f8f9fa', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D5F3F' },

  reciterOption: {
    padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#edeeef',
  },
  reciterOptionActive: {
    backgroundColor: 'rgba(19,71,41,0.1)',
    borderWidth: 1, borderColor: 'rgba(19,71,41,0.2)',
  },
  reciterName: { fontWeight: 'bold', color: '#191c1d', fontSize: 16 },
  reciterStyle: { color: '#9ca3af', fontSize: 14, marginTop: 4 },
});
