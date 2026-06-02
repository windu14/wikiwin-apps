import './global.css';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, CourierPrime_400Regular, CourierPrime_700Bold } from '@expo-google-fonts/courier-prime';

// Screens
import { HomeScreen } from './src/screens/HomeScreen';
import { ExploreScreen } from './src/screens/ExploreScreen';
import { AllDataScreen } from './src/screens/AllDataScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ReviewScreen } from './src/screens/ReviewScreen';
import { EditScreen } from './src/screens/EditScreen';
import { PdfViewerScreen } from './src/screens/PdfViewerScreen';
import { AboutScreen } from './src/screens/AboutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ModernTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fafafa', // zinc-50
    card: '#ffffff',
    text: '#18181b', // zinc-900
    primary: '#18181b',
    border: '#e4e4e7', // zinc-200
  },
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className="absolute left-6 right-6 bg-white rounded-3xl px-2 py-3 flex-row justify-around items-center border border-[#e4e4e7]" 
      style={{ bottom: Math.max(insets.bottom + 16, 24), elevation: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16 }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'help';
        if (route.name === 'Home') iconName = isFocused ? 'home-variant' : 'home-variant-outline';
        else if (route.name === 'Eksplorasi') iconName = isFocused ? 'compass' : 'compass-outline';
        else if (route.name === 'Direktori') iconName = isFocused ? 'folder' : 'folder-outline';

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            onPress={onPress}
            className={`flex-1 items-center justify-center p-2 rounded-2xl mx-1 ${isFocused ? 'bg-[#f4f4f5]' : ''}`}
          >
            <MaterialCommunityIcons 
              name={iconName} 
              size={24} 
              color={isFocused ? '#18181b' : '#a1a1aa'} 
            />
            {isFocused && (
              <Text className="text-[11px] font-bold text-[#18181b] mt-1 tracking-tight font-sans">{route.name}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Eksplorasi" component={ExploreScreen} />
      <Tab.Screen name="Direktori" component={AllDataScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    CourierPrime_400Regular,
    CourierPrime_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={ModernTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#ffffff' },
            headerTintColor: '#18181b',
            headerTitleStyle: { fontFamily: 'Inter_700Bold' },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Review" component={ReviewScreen} options={{ title: 'Detail Dokumen' }} />
          <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Sunting Data' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrasi Data' }} />
          <Stack.Screen name="PdfViewer" component={PdfViewerScreen} options={{ title: 'Tinjau Berkas PDF' }} />
          <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Tentang Aplikasi' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
