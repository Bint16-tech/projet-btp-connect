import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Package, TrendingUp, Trash2, DollarSign } from 'lucide-react-native';

export default function InventoryScreen() {
  const [materials] = useState([
    { id: 1, name: 'Ciment', quantity: 150, unit: 'sacs', price: 4500, surplus: true },
    { id: 2, name: 'Fer', quantity: 320, unit: 'kg', price: 850, surplus: false },
    { id: 3, name: 'Briques', quantity: 1200, unit: 'unités', price: 250, surplus: true },
  ]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6 pt-12" style={{ backgroundColor: COLORS.black }}>
        <Text className="text-white text-2xl font-bold">📦 Mon Inventaire</Text>
        <Text className="text-gray-400 mt-1">Suivi en temps réel</Text>
      </View>
      
      <View className="p-6">
        {materials.map((item) => (
          <View key={item.id} className="bg-gray-50 rounded-2xl p-4 mb-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-xl font-bold" style={{ color: COLORS.black }}>{item.name}</Text>
              <View className={`px-3 py-1 rounded-full ${item.surplus ? 'bg-orange-100' : 'bg-green-100'}`}>
                <Text className={item.surplus ? 'text-orange-600' : 'text-green-600'}>
                  {item.surplus ? 'Surplus' : 'Stock OK'}
                </Text>
              </View>
            </View>
            
            <View className="flex-row justify-between mb-4">
              <Text className="text-gray-600">Quantité: <Text className="font-bold">{item.quantity} {item.unit}</Text></Text>
              <Text className="text-gray-600">Prix unitaire: <Text className="font-bold">{item.price} FCFA</Text></Text>
            </View>
            
            {item.surplus && (
              <TouchableOpacity 
                className="flex-row items-center justify-center p-3 rounded-xl"
                style={{ backgroundColor: COLORS.orange }}
              >
                <DollarSign size={20} color="white" />
                <Text className="text-white font-bold ml-2">Vendre le surplus sur Marketplace</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}