import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Truck, Factory, FileCheck, TrendingUp, Send } from 'lucide-react-native';

export default function EvacuationScreen() {
  const [selectedOption, setSelectedOption] = useState<'neighbor' | 'koryle' | null>(null);

  const handleEvacuation = () => {
    if (selectedOption === 'neighbor') {
      Alert.alert(
        'Vente pour remblai',
        'Gain estimé: +25 000 FCFA\nUn voisin sera mis en relation avec vous.',
        [{ text: 'OK', onPress: () => console.log('Voisin contacté') }]
      );
    } else if (selectedOption === 'koryle') {
      Alert.alert(
        'Envoi à KÔRYLÉ (PK 39)',
        'Coût estimé: -185 000 FCFA\nRecyclage industriel certifié ANAGED',
        [{ text: 'Confirmer', onPress: () => console.log('Certificat généré') }]
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6 pt-12" style={{ backgroundColor: COLORS.black }}>
        <Text className="text-white text-2xl font-bold">♻️ Évacuation & Recyclage</Text>
        <Text className="text-gray-400 mt-1">Solution KÔRYLÉ - PK 39</Text>
      </View>
      
      <View className="p-6">
        <Text className="text-xl font-bold mb-4" style={{ color: COLORS.black }}>Comparateur intelligent</Text>
        
        {/* Option 1: Vendre pour remblai */}
        <TouchableOpacity 
          className={`p-5 rounded-2xl mb-4 border-2 ${selectedOption === 'neighbor' ? 'border-orange-500' : 'border-gray-200'}`}
          onPress={() => setSelectedOption('neighbor')}
        >
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Truck size={24} color={COLORS.orange} />
              <Text className="text-lg font-bold ml-2">Vendre pour remblai</Text>
            </View>
            <Text className="text-green-600 font-bold text-lg">+25 000 FCFA</Text>
          </View>
          <Text className="text-gray-600">Mise en relation directe avec un voisin</Text>
        </TouchableOpacity>
        
        {/* Option 2: Envoyer à KÔRYLÉ */}
        <TouchableOpacity 
          className={`p-5 rounded-2xl mb-6 border-2 ${selectedOption === 'koryle' ? 'border-orange-500' : 'border-gray-200'}`}
          onPress={() => setSelectedOption('koryle')}
        >
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Factory size={24} color={COLORS.orange} />
              <Text className="text-lg font-bold ml-2">Envoyer à KÔRYLÉ</Text>
            </View>
            <Text className="text-red-600 font-bold text-lg">-185 000 FCFA</Text>
          </View>
          <Text className="text-gray-600">Recyclage industriel certifié - PK 39</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="p-4 rounded-xl items-center mb-8"
          style={{ backgroundColor: COLORS.orange }}
          onPress={handleEvacuation}
        >
          <Send size={20} color="white" />
          <Text className="text-white font-bold ml-2">Procéder à l'évacuation</Text>
        </TouchableOpacity>
        
        {/* Coffre-fort numérique */}
        <View className="bg-gray-50 rounded-2xl p-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold">🔐 Coffre-fort numérique</Text>
            <FileCheck size={24} color="#10B981" />
          </View>
          <Text className="text-gray-600 mb-3">Certificats de conformité ANAGED</Text>
          <View className="bg-white p-3 rounded-xl">
            <Text className="text-green-600">✓ Certificat #ANAGED-2024-001</Text>
            <Text className="text-gray-400 text-sm mt-1">Dépôt à l'usine - 15/12/2024</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}