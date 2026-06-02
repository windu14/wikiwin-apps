import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChangeText, placeholder = "Cari dokumen, penulis, tag..." }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View 
      className={`flex-row items-center bg-white px-4 py-3 mb-4 rounded-2xl border ${
        isFocused ? 'border-[#18181b]' : 'border-[#e4e4e7]'
      }`}
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}
    >
      <MaterialCommunityIcons name="magnify" size={24} color={isFocused ? '#18181b' : '#a1a1aa'} />
      <TextInput
        className="flex-1 ml-3 text-base text-[#18181b]"
        placeholder={placeholder}
        placeholderTextColor="#a1a1aa"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {value.length > 0 && (
        <MaterialCommunityIcons 
          name="close-circle" 
          size={20} 
          color="#a1a1aa" 
          onPress={() => onChangeText('')}
        />
      )}
    </View>
  );
};
