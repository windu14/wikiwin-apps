import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export const PdfViewerScreen = ({ route }: any) => {
  const { url } = route.params;

  return (
    <View className="flex-1 bg-[#fafafa]">
      <WebView 
        source={{ uri: url }} 
        className="flex-1"
        startInLoadingState={true}
        renderLoading={() => (
          <View className="absolute inset-0 justify-center items-center bg-[#fafafa]" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            <ActivityIndicator size="large" color="#18181b" />
          </View>
        )}
      />
    </View>
  );
};
