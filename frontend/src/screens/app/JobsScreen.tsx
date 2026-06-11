import React from 'react';
import { View, Text } from 'react-native';

export default function JobsScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      <Text className="text-btp-black text-2xl font-bold">Offres d'emploi</Text>
      <Text className="text-gray-500 mt-2 text-center">Les opportunités de chantier apparaîtront ici.</Text>
    </View>
  );
}
