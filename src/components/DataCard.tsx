import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DataItem } from '../lib/data/db';

interface DataCardProps {
  item: DataItem;
  onPress: () => void;
}

export const DataCard = ({ item, onPress }: DataCardProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  const getIcon = () => {
    if (item.type === 'dokumen') return 'file-document-outline';
    if (item.type === 'cv') return 'card-account-details-outline';
    if (item.type === 'seni') return 'palette-outline';
    return 'book-outline';
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        className="bg-white rounded-3xl mb-3 border border-[#f4f4f5]"
        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 }}
      >
        <View className="p-4 rounded-3xl overflow-hidden flex-row">
          {/* Icon Column */}
          <View className="w-12 items-center justify-center mr-4">
            <View className="w-12 h-12 rounded-2xl bg-[#f4f4f5] items-center justify-center">
              <MaterialCommunityIcons name={getIcon()} size={24} color="#18181b" />
              {item.isLocked && (
                <View className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                  <MaterialCommunityIcons name="lock" size={14} color="#ef4444" />
                </View>
              )}
            </View>
          </View>

          {/* Content Column */}
          <View className="flex-1 justify-center">
            <View className="flex-row justify-between items-start mb-1">
              <Text className="text-[16px] font-bold font-sans text-[#18181b] flex-1 mr-2 leading-5 tracking-tight" numberOfLines={1}>
                {item.title}
              </Text>
              <View className="bg-[#f4f4f5] px-2 py-1 rounded-md">
                <Text className="text-[10px] font-bold font-sans text-[#71717a] uppercase tracking-wider">
                  {item.type}
                </Text>
              </View>
            </View>
            
            <Text className="text-[13px] font-sans text-[#71717a] mb-2 leading-tight" numberOfLines={2}>
              {item.description}
            </Text>
            
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-1.5">
                <MaterialCommunityIcons name="account-circle-outline" size={14} color="#a1a1aa" />
                <Text className="text-[11px] font-sans text-[#a1a1aa] font-medium">
                  {item.author || 'Anonim'}
                </Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <MaterialCommunityIcons name="clock-outline" size={14} color="#a1a1aa" />
                <Text className="text-[11px] font-sans text-[#a1a1aa] font-medium">
                  {item.date || '-'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
