import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { CloudRain, TrendingUp, AlertTriangle } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header avec météo */}
      <View className="p-6 pt-12 rounded-b-3xl" style={{ backgroundColor: COLORS.black }}>
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-bold">Bonjour Koffi 👋</Text>
          <View className="bg-orange-500 px-3 py-1 rounded-full flex-row items-center">
            <CloudRain size={16} color="white" />
            <Text className="text-white ml-1">Risque pluie: 65%</Text>
          </View>
        </View>
        <Text className="text-gray-400 mt-1">Chef de chantier - Abidjan</Text>
      </View>
      
      {/* Dashboard Profit */}
      <View className="p-6">
        <View className="flex-row justify-between mb-4">
          <Text className="text-xl font-bold" style={{ color: COLORS.black }}>📊 Dashboard Profit</Text>
          <TouchableOpacity className="flex-row items-center">
            <TrendingUp size={20} color={COLORS.orange} />
            <Text className="ml-1" style={{ color: COLORS.orange }}>Détails</Text>
          </TouchableOpacity>
        </View>
        
        <View className="bg-gray-100 p-4 rounded-2xl mb-4">
          <Text className="text-gray-600">Économies réalisées</Text>
          <Text className="text-3xl font-bold" style={{ color: COLORS.orange }}>+125 000 FCFA</Text>
        </View>
        
        <View className="bg-red-50 p-4 rounded-2xl flex-row items-center border border-red-200">
          <AlertTriangle size={24} color="#EF4444" />
          <View className="ml-3 flex-1">
            <Text className="text-red-600 font-bold">Alerte météo</Text>
            <Text className="text-red-500">Risque de pluie - Protégez votre ciment</Text>
          </View>
        </View>
      </View>
      
      {/* Actions Rapides */}
      <View className="px-6">
        <Text className="text-xl font-bold mb-3" style={{ color: COLORS.black }}>⚡ Actions rapides</Text>
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 p-4 rounded-xl items-center" style={{ backgroundColor: COLORS.orange }}>
            <Text className="text-white font-bold">📷 Scanner</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 rounded-xl items-center bg-gray-800">
            <Text className="text-white font-bold">➕ Ajouter</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 rounded-xl items-center bg-red-500">
            <Text className="text-white font-bold">⚠️ Perte</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Chantiers propres */}
      <View className="p-6">
        <Text className="text-xl font-bold mb-3" style={{ color: COLORS.black }}>🏗️ Chantiers propres à proximité</Text>
        <View className="bg-green-50 p-4 rounded-2xl">
          <Text className="text-green-700">✓ 3 chantiers certifiés propre</Text>
          <Text className="text-gray-500 text-sm mt-1">Zones sans nuisance signalée</Text>
        </View>
      </View>
    </ScrollView>
  );
}