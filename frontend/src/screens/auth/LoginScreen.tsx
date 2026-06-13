import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BriefcaseBusiness, HardHat, MessageCircle, ShieldCheck } from 'lucide-react-native';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth, UserRole } from '../../store/AuthContext';
import { COLORS } from '../../theme/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('responsable');
  const { login, setUserRole } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    setUserRole(selectedRole);
    await login(email, password);
  };

  const handleWhatsAppLogin = async () => {
    setUserRole(selectedRole);
    await login('whatsapp@btp-connect.local', 'whatsapp');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.panel}>
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>BTP</Text>
          </View>
          <View>
            <Text style={styles.brandTitle}>BTP Connect</Text>
            <Text style={styles.brandTag}>Industriel Radical</Text>
          </View>
        </View>

        <View style={styles.securityRow}>
          <ShieldCheck size={18} color={COLORS.orange} />
          <Text style={styles.securityText}>Espace sécurisé chantier</Text>
        </View>

        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Choisissez votre rôle pour ouvrir le bon tableau de bord.</Text>

        <View style={styles.roleGrid}>
          <TouchableOpacity
            style={[styles.roleButton, selectedRole === 'admin' && styles.roleButtonActive]}
            onPress={() => setSelectedRole('admin')}
          >
            <BriefcaseBusiness size={20} color={selectedRole === 'admin' ? COLORS.black : COLORS.white} />
            <Text style={[styles.roleText, selectedRole === 'admin' && styles.roleTextActive]}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, selectedRole === 'responsable' && styles.roleButtonActive]}
            onPress={() => setSelectedRole('responsable')}
          >
            <HardHat size={20} color={selectedRole === 'responsable' ? COLORS.black : COLORS.white} />
            <Text style={[styles.roleText, selectedRole === 'responsable' && styles.roleTextActive]}>Responsable</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email ou numéro de téléphone"
          placeholderTextColor={COLORS.textSoft}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor={COLORS.textSoft}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleWhatsAppLogin}>
          <MessageCircle size={18} color={COLORS.white} />
          <Text style={styles.secondaryButtonText}>Continuer via WhatsApp</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Pas encore de compte ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    padding: 20,
  },
  panel: {
    backgroundColor: COLORS.black,
    borderRadius: 8,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.orange,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  brandMark: {
    width: 58,
    height: 58,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  brandMarkText: {
    color: COLORS.black,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
  },
  brandTitle: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
  },
  brandTag: {
    color: COLORS.orange,
    fontFamily: 'Montserrat_700Bold',
    textTransform: 'uppercase',
    fontSize: 12,
    marginTop: 3,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  securityText: {
    color: COLORS.textSoft,
    marginLeft: 8,
    fontFamily: 'Montserrat_700Bold',
  },
  title: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 30,
  },
  subtitle: {
    color: '#D1D5DB',
    marginTop: 8,
    marginBottom: 18,
    lineHeight: 22,
    fontFamily: 'Montserrat_400Regular',
  },
  roleGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  roleButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleButtonActive: {
    backgroundColor: COLORS.orange,
  },
  roleText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 8,
  },
  roleTextActive: {
    color: COLORS.black,
  },
  input: {
    height: 56,
    backgroundColor: COLORS.charcoal,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    color: COLORS.white,
    fontFamily: 'Montserrat_400Regular',
    borderWidth: 1,
    borderColor: '#3B3B3B',
  },
  primaryButton: {
    height: 58,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.orange,
    marginTop: 6,
  },
  primaryButtonText: {
    color: COLORS.black,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  secondaryButton: {
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#3B3B3B',
    marginTop: 12,
    backgroundColor: COLORS.charcoal,
  },
  secondaryButtonText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },
  footerText: {
    color: COLORS.textSoft,
    fontFamily: 'Montserrat_400Regular',
  },
  footerLink: {
    color: COLORS.orange,
    fontFamily: 'Montserrat_700Bold',
  },
});
