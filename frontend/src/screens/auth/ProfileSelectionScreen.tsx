import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Building2 } from 'lucide-react-native';
import { AuthStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'ProfileSelection'>;

export default function ProfileSelectionScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.brandMark}>
        <Text style={styles.brandMarkText}>BTP</Text>
      </View>
      <Text style={styles.title}>BTP Connect</Text>
      <Text style={styles.subtitle}>Accédez à l'espace professionnel chantier.</Text>

      <TouchableOpacity style={[styles.profileCard, styles.primaryCard]} onPress={() => navigation.replace('Login')}>
        <View style={styles.iconPillLight}>
          <Building2 size={24} color={COLORS.orange} />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.primaryTitle}>Professionnel chantier</Text>
          <Text style={styles.primarySubtitle}>Stocks, surplus, évacuation et suivi météo.</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  brandMark: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },
  brandMarkText: {
    color: COLORS.orange,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
  },
  title: {
    color: COLORS.text,
    fontSize: 30,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 22,
    fontFamily: 'Montserrat_400Regular',
  },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryCard: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  iconPillLight: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    flex: 1,
    marginLeft: 14,
  },
  primaryTitle: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
  },
  primarySubtitle: {
    color: '#D1D5DB',
    marginTop: 5,
    lineHeight: 20,
    fontFamily: 'Montserrat_400Regular',
  },
});
