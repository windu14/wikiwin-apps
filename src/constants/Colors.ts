import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';

// Konfigurasi Font Global menjadi Serif
const fontConfig = {
  fontFamily: 'serif',
};

const customFonts = configureFonts({ config: fontConfig });

// Palet "Cappuccino Pastel Mocha" yang ditranslasikan ke MD3
export const AppTheme = {
  ...DefaultTheme,
  fonts: customFonts,
  colors: {
    ...DefaultTheme.colors,
    // Warna Utama (Mocha Gelap/Primary)
    primary: '#4a3b32', // mocha900
    onPrimary: '#ffffff',
    primaryContainer: '#d7c0b0', // mocha300
    onPrimaryContainer: '#4a3b32',

    // Warna Sekunder (Latte/Secondary)
    secondary: '#9b7b65', // mocha600
    onSecondary: '#ffffff',
    secondaryContainer: '#f3e8e0', // mocha100
    onSecondaryContainer: '#4a3b32',

    // Warna Tersier (Opsional)
    tertiary: '#0645ad', // Link blue (Wikipedia style)
    onTertiary: '#ffffff',
    tertiaryContainer: '#d3e3fd',
    onTertiaryContainer: '#041e49',

    // Latar Belakang (Cream/Background)
    background: '#fbf7f4', // mocha50
    onBackground: '#4a3b32',

    // Permukaan Kartu/Modal (Surface)
    surface: '#fbf7f4',
    onSurface: '#4a3b32',
    surfaceVariant: '#f3e8e0', // mocha100
    onSurfaceVariant: '#9b7b65', // mocha600

    // Outline / Borders
    outline: '#d7c0b0', // mocha300

    // Status
    error: '#ba1a1a', // standard MD3 error (merah bata)
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    
    // Sukses (Custom MD3)
    success: '#15803d',
  },
};

// Ekspor palet warna asli untuk kasus darurat
export const Colors = {
  mocha50: '#fbf7f4',
  mocha100: '#f3e8e0',
  mocha300: '#d7c0b0',
  mocha600: '#9b7b65',
  mocha900: '#4a3b32',
  primary: '#0645ad',
  success: '#15803d',
  danger: '#ef4444',
  text: '#4a3b32',
  background: '#fbf7f4',
  border: '#d7c0b0',
};
