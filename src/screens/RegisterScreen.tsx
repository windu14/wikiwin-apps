import React, { useState } from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { addDocument, DataItem } from '../lib/data/db';

export const RegisterScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('dokumen');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [gdriveLink, setGdriveLink] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Galat', 'Judul dan Deskripsi wajib diisi.');
      return;
    }
    
    setLoading(true);
    try {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      
      const newDoc: DataItem = {
        title,
        type: type as any,
        description,
        author: author || 'Anonim',
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        gdriveLink,
        externalUrl,
        date: `${yyyy}-${mm}-${dd}`,
        isLocked,
      };

      await addDocument(newDoc);
      Alert.alert('Sukses', 'Data berhasil diregistrasi!', [
        { text: 'OK', onPress: () => {
          setTitle(''); setDescription(''); setAuthor(''); setTags(''); setGdriveLink(''); setExternalUrl(''); setIsLocked(false);
          navigation.navigate('Eksplorasi');
        }}
      ]);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Gagal menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  const renderSegment = (label: string, value: string) => {
    const active = type === value;
    return (
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => setType(value)}
        className={`flex-1 items-center py-2.5 rounded-xl border ${active ? 'bg-[#18181b] border-[#18181b]' : 'bg-transparent border-[#e4e4e7]'}`}
      >
        <Text className={`font-bold font-sans ${active ? 'text-white' : 'text-[#71717a]'}`}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]" edges={['bottom']}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
          
          {/* Lock Section */}
          <View className="bg-white p-5 rounded-3xl mb-6 shadow-sm border border-[#f4f4f5]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
            <Text className="text-[15px] font-bold font-sans text-[#18181b] mb-3">Hak Akses Dokumen</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => setIsLocked(false)}
                className={`flex-1 flex-row items-center justify-center py-3 rounded-2xl border ${!isLocked ? 'bg-[#dcfce7] border-[#22c55e]' : 'bg-[#fafafa] border-[#e4e4e7]'}`}
              >
                <MaterialCommunityIcons name={!isLocked ? "lock-open-variant" : "lock-open-variant-outline"} size={18} color={!isLocked ? "#166534" : "#a1a1aa"} style={{ marginRight: 6 }} />
                <Text className={!isLocked ? 'text-[#166534] font-bold font-sans' : 'text-[#a1a1aa] font-medium font-sans'}>Terbuka</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => setIsLocked(true)}
                className={`flex-1 flex-row items-center justify-center py-3 rounded-2xl border ${isLocked ? 'bg-[#fee2e2] border-[#ef4444]' : 'bg-[#fafafa] border-[#e4e4e7]'}`}
              >
                <MaterialCommunityIcons name={isLocked ? "lock" : "lock-outline"} size={18} color={isLocked ? "#991b1b" : "#a1a1aa"} style={{ marginRight: 6 }} />
                <Text className={isLocked ? 'text-[#991b1b] font-bold font-sans' : 'text-[#a1a1aa] font-medium font-sans'}>Terkunci</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-[12px] font-sans text-[#a1a1aa] mt-3 font-medium text-center">
              {isLocked ? 'Hanya admin yang bisa menyunting data ini.' : 'Publik diizinkan menyunting data ini.'}
            </Text>
          </View>

          <Input label="Judul Dokumen *" value={title} onChangeText={setTitle} />
          
          <View className="mb-6">
            <Text className="text-sm font-medium font-sans text-[#18181b] mb-2 ml-1">Kategori</Text>
            <View className="flex-row gap-2 mb-2">
              {renderSegment('Dokumen', 'dokumen')}
              {renderSegment('CV', 'cv')}
              {renderSegment('Akademis', 'akademis')}
            </View>
            <View className="flex-row gap-2">
              {renderSegment('Jurnal', 'jurnal')}
              {renderSegment('Seni', 'seni')}
            </View>
          </View>

          <Input 
            label="Deskripsi Singkat *" 
            value={description} 
            onChangeText={setDescription} 
            multiline 
            numberOfLines={4} 
          />

          <Input label="Penulis / Pemilik" value={author} onChangeText={setAuthor} />
          <Input label="Tags (Pisahkan dengan koma)" value={tags} onChangeText={setTags} placeholder="Misal: penting, arsip" />
          <Input label="Tautan GDrive (Opsional)" value={gdriveLink} onChangeText={setGdriveLink} keyboardType="url" autoCapitalize="none" />
          <Input label="Tautan Eksternal (Opsional)" value={externalUrl} onChangeText={setExternalUrl} keyboardType="url" autoCapitalize="none" />

          <Button 
            onPress={handleSubmit} 
            disabled={loading}
            className="mt-4"
          >
            {loading ? 'Menyimpan...' : 'SIMPAN DATA'}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
