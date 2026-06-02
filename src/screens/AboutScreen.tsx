import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const AboutScreen = ({ navigation }: any) => {
  return (
    <ScrollView className="flex-1 bg-[#fafafa]" contentContainerStyle={{ padding: 24, alignItems: 'center', paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      
      <View className="items-center mt-10 mb-10">
        <View className="w-24 h-24 bg-[#18181b] rounded-3xl justify-center items-center mb-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 8 }}>
          <MaterialCommunityIcons name="cube-outline" size={48} color="#ffffff" />
        </View>
        <Text className="text-4xl font-black font-sans text-[#18181b] tracking-tighter">WIKIWIN</Text>
        <Text className="text-sm font-bold font-sans text-[#71717a] tracking-tight mt-1">Versi 2.0.0 (Modern UI)</Text>
      </View>

      <View className="w-full bg-white rounded-3xl p-6 mb-10 border border-[#f4f4f5]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 }}>
        
        <View className="flex-row items-start py-3">
          <View className="w-10 h-10 rounded-full bg-[#f4f4f5] justify-center items-center">
            <MaterialCommunityIcons name="code-tags" size={20} color="#18181b" />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-base font-bold font-sans text-[#18181b] mb-1 tracking-tight">Pengembang</Text>
            <Text className="text-sm font-sans text-[#71717a]">Windu</Text>
          </View>
        </View>
        
        <View className="h-px bg-[#f4f4f5] my-2" />
        
        <View className="flex-row items-start py-3">
          <View className="w-10 h-10 rounded-full bg-[#f4f4f5] justify-center items-center">
            <MaterialCommunityIcons name="cellphone-link" size={20} color="#18181b" />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-base font-bold font-sans text-[#18181b] mb-1 tracking-tight">Arsitektur</Text>
            <Text className="text-sm font-sans text-[#71717a] leading-5">
              Aplikasi ini adalah hasil porting native menggunakan React Native & Expo, dirancang ulang menggunakan antarmuka modern Shadcn & NativeWind dengan tipografi estetis.
            </Text>
          </View>
        </View>

        <View className="h-px bg-[#f4f4f5] my-2" />

        <View className="flex-row items-start py-3">
          <View className="w-10 h-10 rounded-full bg-[#f4f4f5] justify-center items-center">
            <MaterialCommunityIcons name="palette-outline" size={20} color="#18181b" />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-base font-bold font-sans text-[#18181b] mb-1 tracking-tight">Desain Antarmuka</Text>
            <Text className="text-sm font-sans text-[#71717a] leading-5">
              Premium UI/UX dengan glassmorphism, micro-animations, fluid layout, serta integrasi ikon flat vektor secara penuh.
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-xs text-[#a1a1aa] font-medium font-sans text-center tracking-tight">
        © 2026 Windu. Hak Cipta Dilindungi Undang-Undang.
      </Text>

    </ScrollView>
  );
};
