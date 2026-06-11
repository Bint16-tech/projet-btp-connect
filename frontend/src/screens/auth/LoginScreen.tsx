import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth } from '../../store/AuthContext';
import { COLORS } from '../../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    await login(email, password);
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-3xl font-bold text-center mb-2" style={{ fontFamily: 'Montserrat_700Bold', color: COLORS.black }}>
        BTP Connect
      </Text>
      <Text className="text-gray-500 text-center mb-8">Connectez-vous à votre compte</Text>
      
      <TextInput
        className="bg-gray-100 p-4 rounded-xl mb-4"
        placeholder="Email ou numéro de téléphone"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        className="bg-gray-100 p-4 rounded-xl mb-6"
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity 
        className="p-4 rounded-xl items-center mb-4"
        style={{ backgroundColor: COLORS.orange }}
        onPress={handleLogin}
      >
        <Text className="text-white font-bold text-lg">Se connecter</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="p-4 rounded-xl items-center border border-gray-300"
        onPress={() => Alert.alert('WhatsApp', 'Connexion via WhatsApp')}
      >
        <Text className="text-gray-700 font-bold">Se connecter via WhatsApp</Text>
      </TouchableOpacity>
      
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600">Pas encore de compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: COLORS.orange }} className="font-bold">S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}