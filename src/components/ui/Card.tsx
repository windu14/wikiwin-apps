import React from 'react';
import { View, ViewProps, Text } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <View 
      className={`bg-white rounded-3xl p-5 border border-[#f4f4f5] shadow-sm ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <Text className={`text-xl font-bold text-[#18181b] mb-1 ${className || ''}`}>{children}</Text>
);

export const CardDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <Text className={`text-sm text-[#71717a] ${className || ''}`}>{children}</Text>
);
