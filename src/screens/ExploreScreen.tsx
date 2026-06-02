import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Network from 'expo-network';
import { DataItem, searchData, getAllData } from '../lib/data/db';
import { DataCard } from '../components/DataCard';
import { SearchBar } from '../components/SearchBar';
import { Button } from '../components/ui/Button';

export const ExploreScreen = ({ navigation }: any) => {
  const [items, setItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  
  // State paginasi
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    setPage(1); // Reset page on new query
    fetchData();
  }, [query]);

  const fetchData = async () => {
    setLoading(true);
    setIsOffline(false);
    try {
      const networkState = await Network.getNetworkStateAsync();
      if (!networkState.isConnected) {
        setIsOffline(true);
        setLoading(false);
        return;
      }

      if (query) {
        const result = await searchData(query);
        setItems(result);
      } else {
        const result = await getAllData();
        setItems(result);
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Galat', 'Gagal memuat data dari server.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const isSearching = query.trim().length > 0;
  
  const displayedItems = isSearching 
    ? items.slice(0, page * ITEMS_PER_PAGE)
    : items.slice(0, 3);
    
  const hasMorePages = isSearching && (page * ITEMS_PER_PAGE < items.length);

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]" edges={['top']}>
      <View className="px-6 pt-6 pb-4">
        <Text className="text-4xl font-black font-sans text-[#18181b] tracking-tighter">Eksplorasi</Text>
        <Text className="text-base font-sans text-[#71717a] mt-1">Telusuri seluruh indeks dokumen yang tersedia</Text>
      </View>
      <View className="flex-1">
        <View className="px-6 pb-4">
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
        
        {loading ? (
          <ActivityIndicator animating={true} size="large" color="#18181b" className="mt-12" />
        ) : isOffline ? (
          <View className="items-center mt-12 px-6">
            <View className="w-24 h-24 rounded-full bg-[#fee2e2] justify-center items-center mb-4">
              <MaterialCommunityIcons name="wifi-off" size={48} color="#ef4444" />
            </View>
            <Text className="text-lg font-bold font-sans text-[#18181b] mb-1">Anda Sedang Offline</Text>
            <Text className="text-center text-sm font-sans text-[#71717a] leading-5 mb-6">
              Tidak ada koneksi internet. Silakan periksa jaringan Anda lalu coba lagi.
            </Text>
            <Button onPress={fetchData}>Coba Lagi</Button>
          </View>
        ) : (
          <FlatList
            data={displayedItems}
            keyExtractor={(item) => item.id!}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <DataCard 
                item={item} 
                onPress={() => navigation.navigate('Review', { id: item.id })} 
              />
            )}
            ListHeaderComponent={
              !isSearching ? (
                <View className="flex-row items-center bg-[#f4f4f5] p-4 rounded-2xl mb-5">
                  <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="#71717a" />
                  <Text className="flex-1 ml-3 text-sm font-sans text-[#71717a] leading-5">
                    Ketik kata kunci di atas untuk mencari data. Di bawah ini adalah 3 dokumen yang terakhir kali ditambahkan.
                  </Text>
                </View>
              ) : (
                <View className="mb-5">
                  <Text className="text-sm font-sans font-medium text-[#71717a]">
                    Ditemukan {items.length} file untuk "{query}"
                  </Text>
                </View>
              )
            }
            ListFooterComponent={
              hasMorePages ? (
                <View className="items-center mt-2 mb-24">
                  <Button 
                    variant="outline"
                    onPress={handleLoadMore} 
                  >
                    Tampilkan Lebih Banyak
                  </Button>
                </View>
              ) : <View className="h-24" /> // Spacing for bottom tab bar
            }
            ListEmptyComponent={
              <View className="items-center mt-12 px-6">
                <View className="w-24 h-24 rounded-full bg-[#f4f4f5] justify-center items-center mb-4">
                  <MaterialCommunityIcons name="database-search-outline" size={48} color="#71717a" />
                </View>
                <Text className="text-lg font-bold font-sans text-[#18181b] mb-1">Hasil Tidak Ditemukan</Text>
                <Text className="text-center text-sm font-sans text-[#71717a] leading-5">
                  Coba gunakan kata kunci lain atau periksa ejaan Anda.
                </Text>
              </View>
            }
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 160 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
