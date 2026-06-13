import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FileText, LogOut, UserRoundPen } from 'lucide-react-native';
import { useAuth } from '../../store/AuthContext';
import { COLORS } from '../../theme/colors';

export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>Jean Dupont</Text>
        <Text style={styles.role}>Chef de chantier</Text>
      </View>

      <TouchableOpacity style={styles.menuItem}>
        <UserRoundPen size={21} color={COLORS.text} />
        <Text style={styles.menuText}>Modifier le profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <FileText size={21} color={COLORS.text} />
        <Text style={styles.menuText}>Mes documents</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <LogOut size={20} color={COLORS.red} />
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 28,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 28,
  },
  name: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 23,
  },
  role: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 5,
  },
  menuItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: COLORS.redSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F7B4B4',
    padding: 16,
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: COLORS.red,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 8,
  },
});
