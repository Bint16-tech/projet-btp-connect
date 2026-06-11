import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'ProfileSelection'>;

export default function ProfileSelectionScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: COLORS.black }]}>BTP Connect</Text>
      <Text style={styles.subtitle}>Choisissez votre profil</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.orange, marginBottom: 16 }]}
        onPress={() => {
          // Stocker le profil PRO
          navigation.replace('Login');
        }}
      >
        <Text style={styles.buttonTitle}>PRO (Chef de chantier)</Text>
        <Text style={styles.buttonSubtitle}>Gestion de stock & évacuation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.black }]}
        onPress={() => {
          // Stocker le profil RIVERAIN
          navigation.replace('Login');
        }}
      >
        <Text style={styles.buttonTitle}>RIVERAIN</Text>
        <Text style={styles.buttonSubtitle}>Signalements citoyens</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 48,
  },
  button: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonSubtitle: {
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
});