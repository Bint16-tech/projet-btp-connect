import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white px-6 py-12">
      <Text className="text-btp-black text-3xl font-[Montserrat_700Bold] mb-2">Créer un compte</Text>
      <Text className="text-gray-500 mb-8">Inscrivez-vous pour rejoindre BTP Connect</Text>
      
      <TextInput 
        className="bg-gray-100 p-4 rounded-xl mb-4"
        placeholder="Nom complet"
      />
      
      <TextInput 
        className="bg-gray-100 p-4 rounded-xl mb-4"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput 
        className="bg-gray-100 p-4 rounded-xl mb-4"
        placeholder="Mot de passe"
        secureTextEntry
      />

      <TextInput 
        className="bg-gray-100 p-4 rounded-xl mb-6"
        placeholder="Confirmer le mot de passe"
        secureTextEntry
      />
      
      <TouchableOpacity 
        className="bg-btp-orange p-4 rounded-xl items-center"
      >
        <Text className="text-white font-bold text-lg">S'inscrire</Text>
      </TouchableOpacity>
      
      <View className="flex-row justify-center mt-6 mb-10">
        <Text className="text-gray-600">Déjà un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-btp-orange font-bold">Se connecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
