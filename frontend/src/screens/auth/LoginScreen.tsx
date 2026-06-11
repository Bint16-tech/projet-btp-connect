import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useAuth } from '../../store/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-btp-black text-3xl font-[Montserrat_700Bold] mb-2">Bienvenue</Text>
      <Text className="text-gray-500 mb-8">Connectez-vous pour continuer</Text>
      
      <TextInput 
        className="bg-gray-100 p-4 rounded-xl mb-4"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput 
        className="bg-gray-100 p-4 rounded-xl mb-6"
        placeholder="Mot de passe"
        secureTextEntry
      />
      
      <TouchableOpacity 
        className="bg-btp-orange p-4 rounded-xl items-center"
        onPress={() => login()}
      >
        <Text className="text-white font-bold text-lg">Se connecter</Text>
      </TouchableOpacity>
      
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600">Pas encore de compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-btp-orange font-bold">S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
