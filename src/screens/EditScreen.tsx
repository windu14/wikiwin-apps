import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { getDataById, updateDocument, DataItem } from '../lib/data/db';

export const EditScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('dokumen');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [gdriveLink, setGdriveLink] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [editNote, setEditNote] = useState('');

  useEffect(() => {
    const fetchDoc = async () => {
      const item = await getDataById(id);
      if (item) {
        setTitle(item.title);
        setType(item.type);
        setDescription(item.description);
        setContent(item.content || '');
        setAuthor(item.author || '');
        setTags(item.tags ? item.tags.join(', ') : '');
        setGdriveLink(item.gdriveLink || '');
        setExternalUrl(item.externalUrl || '');
        setIsLocked(item.isLocked || false);
      }
      setLoading(false);
    };
    fetchDoc();
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !description) {
      Alert.alert('Galat', 'Judul dan Deskripsi wajib diisi.');
      return;
    }
    
    setSaving(true);
    try {
      const updatedDoc: Partial<DataItem> = {
        title,
        type: type as any,
        description,
        content,
        author: author || 'Anonim',
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        gdriveLink,
        externalUrl,
        isLocked,
        lastEditNote: editNote || 'Pembaruan data'
      };

      await updateDocument(id, updatedDoc);
      Alert.alert('Sukses', 'Data berhasil diperbarui!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Gagal memperbarui data.');
    } finally {
      setSaving(false);
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
        <Text className={`font-bold ${active ? 'text-white' : 'text-[#71717a]'}`}>{label}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#fafafa]">
        <ActivityIndicator size="large" color="#18181b" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]" edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        {/* Lock Section */}
        <View className="bg-white p-5 rounded-3xl mb-6 shadow-sm border border-[#f4f4f5]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
          <Text className="text-[15px] font-bold text-[#18181b] mb-3">Hak Akses Dokumen</Text>
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
          <Text className="text-[12px] text-[#a1a1aa] mt-3 font-medium text-center">
            {isLocked ? 'Hanya admin yang bisa menyunting data ini.' : 'Publik diizinkan menyunting data ini.'}
          </Text>
        </View>

        <Input label="Judul Dokumen *" value={title} onChangeText={setTitle} />
        
        <View className="mb-6">
          <Text className="text-sm font-medium text-[#18181b] mb-2 ml-1">Kategori</Text>
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

        <Input label="Deskripsi Singkat *" value={description} onChangeText={setDescription} multiline numberOfLines={3} />
        <Input label="Konten Lengkap" value={content} onChangeText={setContent} multiline numberOfLines={8} />
        <Input label="Tautan GDrive" value={gdriveLink} onChangeText={setGdriveLink} autoCapitalize="none" />
        <Input label="Tautan Eksternal" value={externalUrl} onChangeText={setExternalUrl} autoCapitalize="none" />
        <Input label="Catatan Suntingan" value={editNote} onChangeText={setEditNote} placeholder="Jelaskan perubahan Anda" />

        <Button 
          onPress={handleUpdate} 
          disabled={saving}
          className="mt-4"
        >
          {saving ? 'Menyimpan...' : 'PERBARUI DATA'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
