import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, CloudRain, Package, Recycle, ShoppingBag } from 'lucide-react-native';
import { AppStackParamList } from '../../navigation/types';
import { COLORS } from '../../theme/colors';

type Props = NativeStackScreenProps<AppStackParamList, 'ProjectDashboard'>;

export default function ProjectDashboardScreen({ navigation, route }: Props) {
  const { projectName } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.kicker}>Dashboard chantier</Text>
        <Text style={styles.title}>{projectName}</Text>
        <Text style={styles.subtitle}>Gestion opérationnelle et anti-gaspillage.</Text>
      </View>

      <View style={styles.weatherCard}>
        <CloudRain size={27} color={COLORS.orange} />
        <View style={styles.weatherCopy}>
          <Text style={styles.weatherTitle}>Risque de pluie</Text>
          <Text style={styles.weatherText}>Alerte active: protégez le ciment et les sacs ouverts.</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Tabs', { screen: 'Inventory' })}>
        <Package size={24} color={COLORS.black} />
        <Text style={styles.actionButtonText}>Mon inventaire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionDark} onPress={() => navigation.navigate('Tabs', { screen: 'Evacuation' })}>
        <Recycle size={24} color={COLORS.orange} />
        <Text style={styles.actionDarkText}>Gérer déblais</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionDark} onPress={() => navigation.navigate('Tabs', { screen: 'Marketplace' })}>
        <ShoppingBag size={24} color={COLORS.orange} />
        <Text style={styles.actionDarkText}>Vendre surplus</Text>
      </TouchableOpacity>

      <View style={styles.statsPanel}>
        <Text style={styles.statsTitle}>Résumé chantier</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Stock critique</Text>
          <Text style={styles.statsValue}>Ciment: 150 sacs</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Déchets en attente</Text>
          <Text style={styles.statsValue}>2 alertes</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Économies</Text>
          <Text style={styles.statsValueOrange}>+125 000 FCFA</Text>
        </View>
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
    paddingBottom: 30,
  },
  hero: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 22,
    paddingTop: 52,
    paddingBottom: 28,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.orange,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  kicker: {
    color: COLORS.orange,
    fontFamily: 'Montserrat_700Bold',
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 28,
  },
  subtitle: {
    color: '#D1D5DB',
    fontFamily: 'Montserrat_400Regular',
    marginTop: 8,
  },
  weatherCard: {
    margin: 18,
    padding: 16,
    backgroundColor: COLORS.black,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.orange,
    flexDirection: 'row',
  },
  weatherCopy: {
    marginLeft: 12,
    flex: 1,
  },
  weatherTitle: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
  },
  weatherText: {
    color: '#D1D5DB',
    fontFamily: 'Montserrat_400Regular',
    marginTop: 4,
    lineHeight: 20,
  },
  actionButton: {
    minHeight: 66,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
    marginHorizontal: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  actionButtonText: {
    color: COLORS.black,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 12,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  actionDark: {
    minHeight: 66,
    borderRadius: 8,
    backgroundColor: COLORS.black,
    marginHorizontal: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  actionDarkText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 12,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  statsPanel: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginHorizontal: 18,
    marginTop: 6,
  },
  statsTitle: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statsLabel: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
  },
  statsValue: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
  },
  statsValueOrange: {
    color: COLORS.orangeDark,
    fontFamily: 'Montserrat_700Bold',
  },
});
