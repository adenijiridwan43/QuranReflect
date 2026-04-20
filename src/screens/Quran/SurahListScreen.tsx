import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
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
      style={styles.surahCard}
      onPress={() => navigation.navigate('SurahDetail', { surahId: item.id, surahName: item.name_english })}
    >
      <View style={styles.numberAvatar}>
        <Text style={styles.numberText}>{item.id}</Text>
      </View>

      <View style={styles.surahInfo}>
        <Text style={styles.surahName}>{item.name_english}</Text>
        <Text style={styles.surahMeta}>
          {item.revelation_type} • {item.verses_count} VERSES
        </Text>
      </View>

      <View style={styles.arabicSection}>
        <Text style={styles.arabicName}>{item.name_arabic}</Text>
        <Text style={styles.translatedName}>{item.translated_name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.pageTitle}>The Noble Quran</Text>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#717971" />
          <TextInput
            placeholder="Search surahs by name, meaning, or number..."
            placeholderTextColor="#717971"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  headerSection: {
    paddingHorizontal: 24, paddingVertical: 16,
    backgroundColor: '#f8f9fa', elevation: 2,
  },
  pageTitle: {
    fontSize: 24, fontWeight: 'bold', color: '#2D5F3F', marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#edeeef', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12,
    borderWidth: 1, borderColor: '#c0c9bf',
  },
  searchInput: {
    flex: 1, marginLeft: 12, color: '#191c1d', fontSize: 16,
  },

  surahCard: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#edeeef',
    backgroundColor: '#ffffff', borderRadius: 12, marginBottom: 12, paddingHorizontal: 16,
    elevation: 1,
  },
  numberAvatar: {
    width: 48, height: 48, backgroundColor: '#edeeef', borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', marginRight: 16,
    borderWidth: 1, borderColor: '#c0c9bf',
  },
  numberText: { color: '#735c00', fontWeight: 'bold', fontSize: 18 },

  surahInfo: { flex: 1, justifyContent: 'center' },
  surahName: { color: '#191c1d', fontWeight: 'bold', fontSize: 18 },
  surahMeta: {
    color: '#9ca3af', fontSize: 12, marginTop: 2,
    textTransform: 'uppercase', letterSpacing: 1, fontWeight: '600',
  },

  arabicSection: { alignItems: 'flex-end', justifyContent: 'center' },
  arabicName: {
    color: '#2D5F3F', fontSize: 24, fontWeight: 'bold', textAlign: 'right',
    writingDirection: 'rtl',
  },
  translatedName: {
    color: '#d1d5db', fontSize: 12, textAlign: 'right', marginTop: 4, fontStyle: 'italic',
  },
});
