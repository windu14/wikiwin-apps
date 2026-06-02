import React, { useRef } from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, Animated } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'outline' | 'ghost';
  children: React.ReactNode;
  textClassName?: string;
}

export const Button = ({ variant = 'default', children, style, textClassName, onPress, ...props }: ButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  let bgClass = 'bg-[#18181b]'; // zinc-900 (primary)
  let textColorClass = 'text-[#fafafa]'; // zinc-50

  if (variant === 'outline') {
    bgClass = 'bg-transparent border border-[#e4e4e7]'; // zinc-200
    textColorClass = 'text-[#18181b]';
  } else if (variant === 'ghost') {
    bgClass = 'bg-transparent';
    textColorClass = 'text-[#18181b]';
  }

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity 
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        className={`px-5 py-3.5 rounded-2xl items-center justify-center flex-row ${bgClass}`}
        {...props}
      >
        <Text className={`text-base font-semibold ${textColorClass} ${textClassName || ''}`}>
          {children}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
