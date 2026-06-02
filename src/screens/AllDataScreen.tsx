import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ScrollView, ActivityIndicator, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DataItem, getAllData } from '../lib/data/db';
import { useFocusEffect } from '@react-navigation/native';
import * as Network from 'expo-network';
import { Button } from '../components/ui/Button';

export const AllDataScreen = ({ navigation }: any) => {
  const [items, setItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [isOffline, setIsOffline] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  const categories = ['Semua', 'Dokumen', 'CV', 'Akademis', 'Jurnal', 'Seni'];

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
      const result = await getAllData();
      setItems(result);
    } catch (e) {
      console.error(e);
      Alert.alert('Galat', 'Gagal memuat data dari server.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setPage(1);
  };

  const filteredItems = items.filter(item => {
    if (activeFilter === 'Semua') return true;
    return item.type.toLowerCase() === activeFilter.toLowerCase();
  });

  const displayedItems = filteredItems.slice(0, page * ITEMS_PER_PAGE);
  const hasMorePages = page * ITEMS_PER_PAGE < filteredItems.length;

  const renderItem = ({ item, index }: { item: DataItem, index: number }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Review', { id: item.id })}
      className="flex-row items-center py-4 px-6 bg-white border-b border-[#f4f4f5]"
    >
      <View className="w-8 h-8 rounded-full bg-[#f4f4f5] justify-center items-center mr-4">
        <Text className="text-xs font-bold font-sans text-[#18181b]">{index + 1}</Text>
      </View>
      <View className="flex-1 justify-center">
        <Text className="text-[15px] font-bold font-sans text-[#18181b] mb-0.5 leading-5 tracking-tight" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-[13px] font-sans text-[#71717a] tracking-tight">{item.author || 'Anonim'}</Text>
      </View>
      <View className="flex-row items-center ml-2">
        {item.isLocked && <MaterialCommunityIcons name="lock" size={14} color="#ef4444" style={{marginRight: 6}} />}
        <View className="bg-[#f4f4f5] px-2 py-1 rounded-md">
          <Text className="text-[10px] font-bold font-sans text-[#71717a] uppercase tracking-wider">
            {item.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#fafafa]" edges={['top']}>
        {/* Header & Tips */}
        <View className="px-6 pt-6 pb-2">
          <Text className="text-4xl font-black font-sans text-[#18181b] tracking-tighter">Direktori</Text>
          <Text className="text-sm font-sans text-[#71717a] mt-1 mb-2">
            Pusat penyimpanan arsip. Gunakan filter di bawah untuk menyortir.
          </Text>
        </View>

        {/* Filter Bar */}
        <View className="bg-[#fafafa] pb-3 pt-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}>
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  activeOpacity={0.8}
                  onPress={() => handleFilterChange(cat)}
                  className={`px-5 py-2.5 rounded-full ${isActive ? 'bg-[#18181b]' : 'bg-white border border-[#e4e4e7]'}`}
                  style={!isActive ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 } : {}}
                >
                  <Text className={`text-sm font-bold tracking-tight font-sans ${isActive ? 'text-white' : 'text-[#71717a]'}`}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 160 }}
            ListEmptyComponent={
              <Text className="text-center text-sm text-[#71717a] mt-12 tracking-tight font-sans">Database kosong atau filter tidak ditemukan.</Text>
            }
            ListFooterComponent={
              hasMorePages ? (
                <Button 
                  variant="ghost" 
                  onPress={() => setPage(prev => prev + 1)} 
                  className="my-4 mx-6 self-center"
                >
                  Tampilkan Lebih Banyak
                </Button>
              ) : null
            }
          />
        )}
      </SafeAreaView>

      {/* Modern FAB */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Register')}
        className="absolute right-6 bg-[#18181b] flex-row items-center justify-center px-5 py-3.5 rounded-full shadow-lg"
        style={{ bottom: 150, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 }}
      >
        <MaterialCommunityIcons name="plus" size={20} color="#ffffff" />
        <Text className="text-white font-bold font-sans ml-2 tracking-tight">Data Baru</Text>
      </TouchableOpacity>
    </>
  );
};
