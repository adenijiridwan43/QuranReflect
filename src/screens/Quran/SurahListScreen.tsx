import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from 'expo-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';

export default function SurahListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [surahs, setSurahs] = useState<any[]>([]);
  const navigation = useNavigation<any>();
  const db = useSQLiteContext();

  React.useEffect(() => {
    async function loadSurahs() {
      const result = await db.getAllAsync(`SELECT * FROM surahs ORDER BY id ASC`);
      setSurahs(result);
    }
    loadSurahs();
  }, [db]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      className="flex-row items-center py-4 border-b border-surface-container bg-surface-lowest rounded-xl mb-3 px-4 shadow-sm"
      onPress={() => navigation.navigate('SurahDetail', { surahId: item.id, surahName: item.name_english })}
    >
      {/* Surah Number Avatar */}
      <View className="w-12 h-12 bg-surface-container rounded-full items-center justify-center mr-4 border border-outline-variant">
        <Text className="text-secondary font-bold text-lg">{item.id}</Text>
      </View>

      {/* Surah Details */}
      <View className="flex-1 justify-center">
        <Text className="text-on-surface font-bold text-lg">{item.name_english}</Text>
        <Text className="text-gray-500 text-xs mt-0.5 uppercase tracking-wider font-semibold">
          {item.revelation_type} • {item.verses_count} VERSES
        </Text>
      </View>

      {/* Arabic Script */}
      <View className="items-end justify-center">
        <Text className="text-primary-container text-2xl font-arabic font-bold text-right" style={{ writingDirection: 'rtl' }}>
          {item.name_arabic}
        </Text>
        <Text className="text-gray-400 text-xs text-right mt-1 italic">
          {item.translated_name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="px-6 py-4 bg-surface shadow-sm z-10">
        <Text className="text-2xl font-bold font-heading text-primary-container mb-4">
          The Noble Quran
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-surface-container-low rounded-2xl px-4 py-3 border border-outline-variant">
          <Ionicons name="search" size={20} color="#717971" />
          <TextInput
            placeholder="Search surahs by name, meaning, or number..."
            placeholderTextColor="#717971"
            className="flex-1 ml-3 text-on-surface font-body text-base"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Surah List */}
      <FlatList
        data={surahs.filter(s => s.name_english.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             s.translated_name.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
