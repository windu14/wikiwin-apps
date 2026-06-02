import React, { useState } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = ({ label, error, icon, style, onFocus, onBlur, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-4 w-full" style={style}>
      {label && <Text className="text-sm font-medium text-[#18181b] mb-1.5 ml-1">{label}</Text>}
      <View 
        className={`flex-row items-center px-4 py-3.5 bg-[#f4f4f5] rounded-2xl border ${
          isFocused ? 'border-[#18181b]' : error ? 'border-red-500' : 'border-transparent'
        }`}
      >
        {icon && <View className="mr-3">{icon}</View>}
        <TextInput
          className="flex-1 text-[#18181b] text-base"
          placeholderTextColor="#a1a1aa"
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          {...props}
        />
      </View>
      {error && <Text className="text-xs text-red-500 mt-1.5 ml-1">{error}</Text>}
    </View>
  );
};
