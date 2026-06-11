import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Recycle, ShoppingBag, TrendingDown } from 'lucide-react-native';

export default function MarketplaceScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6 pt-12" style={{ backgroundColor: COLORS.black }}>
        <Text className="text-white text-2xl font-bold">🛍️ Marketplace</Text>
        <Text className="text-gray-400 mt-1">Vente de surplus & produits recyclés</Text>
      </View>
      
      {/* Surplus entre chantiers */}
      <View className="p-6">
        <Text className="text-xl font-bold mb-3" style={{ color: COLORS.black }}>🏗️ Surplus entre chantiers</Text>
        <View className="bg-gray-50 rounded-2xl p-4 mb-6">
          <View className="flex-row justify-between mb-3">
            <Text className="font-bold">Ferraille - Chantier Cocody</Text>
            <Text className="text-orange-600 font-bold">250 000 FCFA</Text>
          </View>
          <Text className="text-gray-500 text-sm">Quantité: 500 kg • État: Neuf</Text>
          <TouchableOpacity className="mt-3 p-3 rounded-xl items-center" style={{ backgroundColor: COLORS.orange }}>
            <Text className="text-white font-bold">Contacter le vendeur</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Shop KÔRYLÉ */}
      <View className="px-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-bold" style={{ color: COLORS.black }}>♻️ Shop KÔRYLÉ</Text>
          <Recycle size={24} color={COLORS.orange} />
        </View>
        
        <View className="bg-gray-50 rounded-2xl p-4 mb-4">
          <Text className="font-bold mb-2">Granulats recyclés</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Prix recyclé:</Text>
            <Text className="text-green-600 font-bold">15 000 FCFA/tonne</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Prix neuf:</Text>
            <Text className="text-gray-400 line-through">25 000 FCFA/tonne</Text>
          </View>
          <Text className="text-orange-600 mt-2 font-bold">✓ Économie: 10 000 FCFA</Text>
        </View>
        
        <View className="bg-gray-50 rounded-2xl p-4">
          <Text className="font-bold mb-2">Briques recyclées</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Prix recyclé:</Text>
            <Text className="text-green-600 font-bold">85 FCFA/unité</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Prix neuf:</Text>
            <Text className="text-gray-400 line-through">150 FCFA/unité</Text>
          </View>
          <Text className="text-orange-600 mt-2 font-bold">✓ Économie: 65 FCFA</Text>
        </View>
      </View>
      
      <View className="p-6">
        <TouchableOpacity className="p-4 rounded-xl items-center flex-row justify-center" style={{ backgroundColor: '#10B981' }}>
          <ShoppingBag size={20} color="white" />
          <Text className="text-white font-bold ml-2">Voir tout le catalogue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}