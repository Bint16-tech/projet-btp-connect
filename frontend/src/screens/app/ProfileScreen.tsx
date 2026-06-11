import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../store/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View className="flex-1 bg-white p-6">
      <View className="items-center mt-10 mb-8">
        <View className="w-24 h-24 bg-btp-orange rounded-full items-center justify-center mb-4">
          <Text className="text-white text-3xl font-bold">JD</Text>
        </View>
        <Text className="text-btp-black text-2xl font-bold">Jean Dupont</Text>
        <Text className="text-gray-500">Chef de Chantier</Text>
      </View>

      <TouchableOpacity 
        className="bg-gray-100 p-4 rounded-xl mb-4"
        onPress={() => {}}
      >
        <Text className="text-btp-black font-semibold">Modifier le profil</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="bg-gray-100 p-4 rounded-xl mb-4"
        onPress={() => {}}
      >
        <Text className="text-btp-black font-semibold">Mes documents</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="bg-red-50 p-4 rounded-xl mt-auto"
        onPress={() => logout()}
      >
        <Text className="text-red-500 font-bold text-center">Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}
