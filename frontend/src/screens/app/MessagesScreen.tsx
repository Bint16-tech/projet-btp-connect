import React from 'react';
import { View, Text } from 'react-native';

export default function MessagesScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      <Text className="text-btp-black text-2xl font-bold">Messages</Text>
      <Text className="text-gray-500 mt-2 text-center">Vos conversations avec les recruteurs et partenaires.</Text>
    </View>
  );
}
