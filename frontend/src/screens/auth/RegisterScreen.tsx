import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Créer un compte</Text>
      <Text style={styles.subtitle}>Inscrivez-vous pour rejoindre BTP Connect.</Text>

      <TextInput style={styles.input} placeholder="Nom complet" placeholderTextColor={COLORS.textSoft} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.textSoft}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput style={styles.input} placeholder="Mot de passe" placeholderTextColor={COLORS.textSoft} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmer le mot de passe" placeholderTextColor={COLORS.textSoft} secureTextEntry />

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>S'inscrire</Text>
      </TouchableOpacity>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Déjà un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 30,
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 26,
  },
  input: {
    height: 54,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    color: COLORS.text,
    fontFamily: 'Montserrat_400Regular',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  primaryButton: {
    height: 54,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.orange,
    marginTop: 8,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
    marginBottom: 24,
  },
  footerText: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
  },
  footerLink: {
    color: COLORS.orange,
    fontFamily: 'Montserrat_700Bold',
  },
});
