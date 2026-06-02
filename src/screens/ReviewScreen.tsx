import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { DataItem, getDataById } from '../lib/data/db';

export const ReviewScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [item, setItem] = useState<DataItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const data = await getDataById(id);
      setItem(data);
      setLoading(false);
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#fafafa]">
        <ActivityIndicator size="large" color="#18181b" />
      </View>
    );
  }

  if (!item) {
    return (
      <View className="flex-1 justify-center items-center bg-[#fafafa]">
        <Text className="text-[#ef4444] font-courierBold text-lg">Dokumen tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView className="flex-1 bg-[#fafafa]" contentContainerStyle={{ padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        <Text className="text-3xl font-courierBold text-[#18181b] tracking-tight leading-10 mb-2">{item.title}</Text>
        <View className="h-px bg-[#e4e4e7] mb-4" />
        
        {item.isLocked && (
          <View className="flex-row items-center bg-[#fee2e2] self-start px-3 py-1.5 rounded-xl mb-4">
            <MaterialCommunityIcons name="lock" size={12} color="#ef4444" />
            <Text className="text-[#ef4444] font-courierBold text-[10px] ml-1 tracking-wider">TERKUNCI</Text>
          </View>
        )}

        <Text className="text-lg text-[#71717a] font-sans leading-7 mb-6 italic">{item.description}</Text>
        
        {item.content && (
          <Text className="text-[15px] font-sans text-[#18181b] leading-7 mb-10 text-justify">{item.content}</Text>
        )}

        <View className="bg-white rounded-3xl p-5 border border-[#f4f4f5]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
          <Text className="text-lg font-courierBold text-[#18181b] mb-4">Meta Data</Text>
          <View className="h-[2px] bg-[#18181b] mb-2" />
          
          <View className="flex-row justify-between items-center py-3 border-b border-[#f4f4f5]">
            <Text className="text-sm font-courierBold text-[#a1a1aa]">Kategori</Text>
            <Text className="text-sm font-courierBold text-[#18181b] uppercase tracking-wider">{item.type}</Text>
          </View>
          
          <View className="flex-row justify-between items-center py-3 border-b border-[#f4f4f5]">
            <Text className="text-sm font-courierBold text-[#a1a1aa]">Penulis</Text>
            <Text className="text-sm font-sans text-[#18181b]">{item.author || '-'}</Text>
          </View>
          
          <View className="flex-row justify-between items-center py-3 border-b border-[#f4f4f5]">
            <Text className="text-sm font-courierBold text-[#a1a1aa]">Tanggal</Text>
            <Text className="text-sm font-sans text-[#18181b]">{item.date || '-'}</Text>
          </View>
          
          {item.gdriveLink && (
            <View className="flex-row justify-between items-center py-3 border-b border-[#f4f4f5]">
              <Text className="text-sm font-courierBold text-[#a1a1aa]">Akses Berkas</Text>
              <TouchableOpacity onPress={() => navigation.navigate('PdfViewer', { url: item.gdriveLink })} className="flex-row items-center">
                <MaterialCommunityIcons name="file-pdf-box" size={18} color="#18181b" />
                <Text className="text-sm font-courierBold text-[#18181b] ml-1">Tinjau PDF</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {item.externalUrl && (
            <View className="flex-row justify-between items-center py-3 border-b border-[#f4f4f5]">
              <Text className="text-sm font-courierBold text-[#a1a1aa]">Eksternal</Text>
              <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(item.externalUrl!)} className="flex-row items-center">
                <MaterialCommunityIcons name="open-in-new" size={16} color="#18181b" />
                <Text className="text-sm font-courierBold text-[#18181b] ml-1">Kunjungi Web</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {item.editCount !== undefined && item.editCount > 0 && (
            <View className="py-3">
              <Text className="text-sm font-courierBold text-[#a1a1aa] mb-1">Riwayat Sunting</Text>
              <Text className="text-sm font-sans text-[#18181b]">Disunting {item.editCount} kali</Text>
              {item.lastEditDate && <Text className="text-xs font-sans text-[#a1a1aa] mt-0.5">Terakhir: {item.lastEditDate}</Text>}
            </View>
          )}
        </View>

      </ScrollView>

      {!item.isLocked && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Edit', { id: item.id })}
          className="absolute bottom-8 right-6 bg-[#18181b] flex-row items-center justify-center px-5 py-3.5 rounded-full shadow-lg"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 }}
        >
          <MaterialCommunityIcons name="pencil" size={20} color="#ffffff" />
          <Text className="text-white font-courierBold ml-2 tracking-tight">Sunting</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
