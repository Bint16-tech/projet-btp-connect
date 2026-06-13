import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { AlertTriangle, Camera, CheckCircle, MapPin } from 'lucide-react-native';
import { COLORS } from '../../theme/colors';

export default function CitizenScreen() {
  const handleSignalNuisance = () => {
    Alert.alert('Signalement de nuisance', 'Prenez une photo du problème à signaler.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Ouvrir appareil photo', onPress: () => console.log('Camera ouverte') },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <MapPin size={28} color={COLORS.orange} />
        <Text style={styles.headerTitle}>Espace riverain</Text>
        <Text style={styles.headerSubtitle}>Signalements citoyens - Évelyne</Text>
      </View>

      <View style={styles.mapCard}>
        <MapPin size={46} color={COLORS.orange} />
        <Text style={styles.mapTitle}>Carte interactive</Text>
        <Text style={styles.mapText}>3 chantiers propres à proximité</Text>
      </View>

      <TouchableOpacity style={styles.reportButton} onPress={handleSignalNuisance}>
        <Camera size={23} color={COLORS.white} />
        <Text style={styles.reportButtonText}>Signaler une nuisance</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Nuisances fréquentes</Text>
      <View style={styles.warningCard}>
        <AlertTriangle size={20} color={COLORS.yellow} />
        <Text style={styles.warningText}>Caniveau bouché par du sable</Text>
      </View>
      <View style={styles.warningCardOrange}>
        <AlertTriangle size={20} color={COLORS.orangeDark} />
        <Text style={styles.warningTextOrange}>Trottoir encombré par des matériaux</Text>
      </View>

      <View style={styles.alertsCard}>
        <Text style={styles.alertsTitle}>Dernières alertes envoyées</Text>
        <View style={styles.alertLine}>
          <AlertTriangle size={16} color={COLORS.red} />
          <Text style={styles.alertText}>Canal bouché - Zone 4</Text>
          <View style={styles.statusDone}>
            <CheckCircle size={14} color={COLORS.green} />
            <Text style={styles.statusDoneText}>Traité</Text>
          </View>
        </View>
        <View style={styles.alertLine}>
          <AlertTriangle size={16} color={COLORS.red} />
          <Text style={styles.alertText}>Trottoir bloqué - Riviera</Text>
          <Text style={styles.statusPending}>En cours</Text>
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
    paddingBottom: 28,
  },
  header: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 26,
  },
  headerTitle: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 25,
    marginTop: 12,
  },
  headerSubtitle: {
    color: '#C7CBD1',
    fontFamily: 'Montserrat_400Regular',
    marginTop: 6,
  },
  mapCard: {
    height: 190,
    backgroundColor: COLORS.blueSoft,
    borderRadius: 8,
    margin: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C9DAFF',
  },
  mapTitle: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    marginTop: 10,
  },
  mapText: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 4,
  },
  reportButton: {
    height: 54,
    borderRadius: 8,
    backgroundColor: COLORS.red,
    marginHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  reportButtonText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    textTransform: 'uppercase',
    marginLeft: 9,
  },
  sectionTitle: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    marginHorizontal: 18,
    marginBottom: 12,
  },
  warningCard: {
    backgroundColor: COLORS.yellowSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F8E7A2',
    padding: 14,
    marginHorizontal: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningCardOrange: {
    backgroundColor: COLORS.orangeSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD7A0',
    padding: 14,
    marginHorizontal: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningText: {
    color: COLORS.yellow,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 10,
    flex: 1,
  },
  warningTextOrange: {
    color: COLORS.orangeDark,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 10,
    flex: 1,
  },
  alertsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginHorizontal: 18,
  },
  alertsTitle: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 14,
  },
  alertLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertText: {
    color: COLORS.text,
    fontFamily: 'Montserrat_400Regular',
    marginLeft: 8,
    flex: 1,
  },
  statusDone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDoneText: {
    color: COLORS.green,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 4,
    fontSize: 12,
  },
  statusPending: {
    color: COLORS.orangeDark,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 12,
  },
});
