import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../theme/colors';
import { MapPin, Camera, AlertTriangle, CheckCircle } from 'lucide-react-native';

export default function CitizenScreen() {
  const handleSignalNuisance = () => {
    Alert.alert(
      'Signalement de nuisance',
      'Prenez une photo du problème (caniveau bouché, trottoir encombré)',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Ouvrir appareil photo', onPress: () => console.log('Camera ouverte') }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6 pt-12" style={{ backgroundColor: COLORS.black }}>
        <Text className="text-white text-2xl font-bold">🗺️ Espace Riverain</Text>
        <Text className="text-gray-400 mt-1">Signalements citoyens - Évelyne</Text>
      </View>
      
      <View className="p-6">
        {/* Carte interactive */}
        <View className="bg-gray-200 rounded-2xl h-48 mb-6 justify-center items-center">
          <MapPin size={48} color={COLORS.orange} />
          <Text className="text-gray-600 mt-2">Carte interactive (Google Maps)</Text>
          <Text className="text-gray-400 text-sm">Chantiers propres à proximité: 3</Text>
        </View>
        
        {/* Bouton Signalement */}
        <TouchableOpacity 
          className="p-5 rounded-2xl mb-6 flex-row items-center justify-center"
          style={{ backgroundColor: '#EF4444' }}
          onPress={handleSignalNuisance}
        >
          <Camera size={24} color="white" />
          <Text className="text-white font-bold text-lg ml-2">🚨 SIGNALER UNE NUISANCE</Text>
        </TouchableOpacity>
        
        {/* Types de nuisances */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-3">Nuisances fréquentes:</Text>
          <View className="bg-yellow-50 p-4 rounded-xl mb-3 border border-yellow-200">
            <Text className="text-yellow-800">⚠️ Caniveau bouché par du sable</Text>
          </View>
          <View className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <Text className="text-orange-800">🚧 Trottoir encombré par des matériaux</Text>
          </View>
        </View>
        
        {/* Dernières alertes */}
        <View className="bg-gray-50 rounded-2xl p-4">
          <Text className="font-bold mb-3">📢 Dernières alertes envoyées</Text>
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <AlertTriangle size={16} color="#EF4444" />
              <Text className="ml-2">Canal bouché - Zone 4</Text>
            </View>
            <Text className="text-green-600 text-sm">Traité ✓</Text>
          </View>
          <View className="flex-row items-center">
            <AlertTriangle size={16} color="#EF4444" />
            <Text className="ml-2">Trottoir bloqué - Riviera</Text>
            <Text className="text-orange-600 text-sm ml-auto">En cours</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}