import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { COLORS } from '../../theme/colors';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="bg-btp-black p-6 pt-12 rounded-b-[30px]">
        <Text className="text-white text-2xl font-[Montserrat_700Bold]">Bonjour 👋</Text>
        <Text className="text-gray-400 mt-1">Trouvez votre prochain projet BTP</Text>
      </View>
      
      <View className="p-6">
        <Text className="text-btp-black text-xl font-bold mb-4">Actualités</Text>
        <View className="bg-gray-100 p-4 rounded-2xl h-40 justify-center items-center">
          <Text className="text-gray-500">Aucune actualité pour le moment</Text>
        </View>
      </View>
    </ScrollView>
  );
}
