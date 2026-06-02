import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const HomeScreen = ({ navigation }: any) => {
  const fullText = "WIKIWIN.";
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Efek animasi mengetik (Looping)
  useEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout;
    
    const typeWriter = () => {
      setIsTyping(true);
      typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTimeout(() => {
            setDisplayedText("");
            i = 0;
            typeWriter();
          }, 3000);
        }
      }, 150);
    };

    typeWriter();

    return () => clearInterval(typingInterval);
  }, []);

  const handleSearchPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true })
    ]).start(() => {
      navigation.navigate('Eksplorasi');
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]" edges={['top']}>
      {/* Header Info Button */}
      <View className="flex-row justify-end px-6 pt-4">
        <TouchableOpacity 
          className="p-2.5 bg-white rounded-2xl border border-[#f4f4f5]"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}
          onPress={() => navigation.navigate('About')}
        >
          <MaterialCommunityIcons name="information-variant" size={24} color="#18181b" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center px-8 pb-20">
        <View className="flex-row items-center mb-4">
          <Text className="text-6xl font-black font-sans text-[#18181b] tracking-tighter text-center">
            {displayedText}
          </Text>
          {isTyping && (
            <View className="w-1.5 h-12 bg-[#18181b] ml-1 rounded-full" />
          )}
        </View>
        
        <Text className="text-xl font-bold font-sans text-[#71717a] mb-3 tracking-tight text-center">
          Pusat Informasi Pribadi.
        </Text>
        <Text className="text-base text-[#a1a1aa] font-sans mb-10 leading-6 text-center">
          Temukan dokumen, jurnal, dan karya Anda dalam sekejap dengan pengalaman yang fluid dan modern.
        </Text>

        {/* Dummy Search Bar dengan Animasi */}
        <TouchableOpacity activeOpacity={1} onPress={handleSearchPress} className="w-full">
          <Animated.View 
            style={[{ transform: [{ scale: scaleAnim }] }, { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 5 }]}
            className="flex-row items-center bg-white px-5 py-4 rounded-3xl border border-[#e4e4e7] w-full"
          >
            <MaterialCommunityIcons name="magnify" size={24} color="#71717a" />
            <Text className="ml-3 text-[15px] font-sans text-[#a1a1aa] font-medium">
              Mulai ketik pencarian...
            </Text>
          </Animated.View>
        </TouchableOpacity>
        
        {/* Tips Section */}
        <View className="mt-8 flex-row items-start px-2">
          <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color="#d4d4d8" style={{ marginTop: 2 }} />
          <Text className="ml-2 text-sm text-[#a1a1aa] font-sans leading-5 text-center flex-1">
            Tekan bilah pencarian di atas untuk mulai menelusuri atau melihat koleksi terbaru Anda.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
