import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Switch, Modal, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from 'expo-vector-icons';

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
      
      // Check offline audio status
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
    <SafeAreaView className="flex-1 bg-surface">
      {/* Dynamic Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-surface border-b border-surface-container shadow-sm z-10">
        <TouchableOpacity 
          className="p-2 rounded-full w-10 h-10 items-center justify-center bg-surface-container"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#134729" />
        </TouchableOpacity>
        
        <Text className="text-xl font-bold font-heading text-primary-container">
          {surahName}
        </Text>

        <TouchableOpacity 
          className="p-2 rounded-full w-10 h-10 items-center justify-center bg-surface-container"
          onPress={() => setShowReciterModal(true)}
        >
          <Ionicons name="headset-outline" size={20} color="#134729" />
        </TouchableOpacity>
      </View>

      {/* Global Actions Bar - translation toggle/audio */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-surface-lowest">
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center">
            <Text className="text-on-surface font-semibold mr-3">EN</Text>
            <Switch 
              value={showTranslation} 
              onValueChange={setShowTranslation}
              trackColor={{ false: '#d9dadb', true: '#b8efc6' }}
              thumbColor={showTranslation ? '#134729' : '#f8f9fa'}
            />
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          {isDownloading ? (
            <View className="flex-row items-center bg-surface-container px-3 py-1.5 rounded-full">
              <ActivityIndicator size="small" color="#134729" />
              <Text className="text-xs text-primary font-bold ml-2">{(downloadProgress * 100).toFixed(0)}%</Text>
            </View>
          ) : isDownloadedLocally ? (
            <View className="p-2 bg-secondary/20 rounded-full">
              <Ionicons name="checkmark-done" size={16} color="#735c00" />
            </View>
          ) : (
            <TouchableOpacity onPress={handleDownload} className="p-2 bg-surface-container rounded-full">
              <Ionicons name="cloud-download-outline" size={16} color="#134729" />
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            className="bg-primary px-4 py-2 rounded-full flex-row items-center"
            onPress={handlePlayToggle}
          >
            <Ionicons name={isPlaying && playingSurahId === surahId ? "pause" : "play"} size={16} color="#ffffff" />
            <Text className="text-white font-bold ml-2">
              {isPlaying && playingSurahId === surahId ? "Pause" : "Listen"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}>
        {/* Decorative Header specific to Surah detail */}
        <View className="items-center py-8 mb-6 border-b border-surface-container/50">
          <View className="w-16 h-16 bg-secondary/10 rounded-full items-center justify-center mb-4">
            <MaterialCommunityIcons name="ornament" size={32} color="#735c00" />
          </View>
          <Text className="text-3xl font-arabic font-bold text-primary-container mb-2" style={{ writingDirection: 'rtl' }}>
            {surahData?.name_arabic || ''}
          </Text>
          <Text className="text-gray-500 uppercase tracking-widest text-xs font-semibold">
            {surahData?.revelation_type || '...'} • {surahData?.verses_count || '0'} Verses
          </Text>
        </View>

        {/* Render Bismillah if not Surah Al-Fatihah or At-Tawbah */}
        {surahId !== 1 && surahId !== 9 && (
          <View className="items-center mb-10 pb-4 border-b border-surface-container-low">
            <Text className="text-3xl text-primary font-arabic mb-3 text-center" style={{ lineHeight: 48, writingDirection: 'rtl' }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </Text>
            {showTranslation && (
              <Text className="text-gray-500 text-center font-reading italic px-4">
                In the name of Allah, the Entirely Merciful, the Especially Merciful.
              </Text>
            )}
          </View>
        )}

        {/* Verses Rendering */}
        {verses.map((verse, index) => {
          // Regular Verse Styling
          return (
            <View key={verse.id} className="mb-8 border-l-2 border-primary/20 pl-4 py-1 relative">
              {/* Verse Number Badging */}
              <View className="flex-row items-center justify-between mb-4">
                <View className="w-8 h-8 rounded-full bg-surface-container items-center justify-center">
                  <Text className="text-primary-container font-bold text-xs">{verse.verse_number}</Text>
                </View>
                <View className="flex-row gap-4">
                  <TouchableOpacity>
                    <Ionicons name="bookmark-outline" size={20} color="#717971" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="feather" size={20} color="#717971" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="share-outline" size={20} color="#717971" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text className="text-3xl text-right text-on-surface font-arabic mb-4" style={{ lineHeight: 60, writingDirection: 'rtl' }}>
                {verse.text_uthmani}
              </Text>
              
              {showTranslation && (
                <Text className="text-lg text-left text-on-surface/80 font-reading leading-relaxed bg-surface-lowest p-3 rounded-lg mt-2">
                  {verse.translation_saheeh}
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Reciter Selection Modal */}
      <Modal visible={showReciterModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-surface rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold font-heading text-primary-container">Select Reciter</Text>
              <TouchableOpacity onPress={() => setShowReciterModal(false)}>
                <Ionicons name="close" size={24} color="#134729" />
              </TouchableOpacity>
            </View>
            
            {AVAILABLE_RECITERS.map((reciter) => (
              <TouchableOpacity
                key={reciter.id}
                className={`p-4 rounded-xl mb-3 flex-row items-center justify-between ${selectedReciter.id === reciter.id ? 'bg-primary/10 border border-primary/20' : 'bg-surface-container'}`}
                onPress={() => {
                  setReciter(reciter);
                  setShowReciterModal(false);
                }}
              >
                <View>
                  <Text className="font-bold text-on-surface text-base">{reciter.name}</Text>
                  <Text className="text-gray-500 text-sm mt-1">{reciter.style}</Text>
                </View>
                {selectedReciter.id === reciter.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#134729" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
