import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Factory, FileCheck, Recycle, Send, Truck } from 'lucide-react-native';
import { COLORS } from '../../theme/colors';

type WasteType = 'Gravats propres' | 'Déchets mixtes' | 'Amiante';
type EvacuationOption = 'neighbor' | 'koryle' | null;

const wasteTypes: WasteType[] = ['Gravats propres', 'Déchets mixtes', 'Amiante'];

export default function EvacuationScreen() {
  const [selectedWaste, setSelectedWaste] = useState<WasteType>('Gravats propres');
  const [selectedOption, setSelectedOption] = useState<EvacuationOption>(null);
  const [certificateVisible, setCertificateVisible] = useState(false);

  const pricing = useMemo(() => {
    if (selectedWaste === 'Amiante') {
      return { neighbor: null, koryle: '-320 000 FCFA', note: 'Traitement spécialisé requis.' };
    }
    if (selectedWaste === 'Déchets mixtes') {
      return { neighbor: '+10 000 FCFA', koryle: '-210 000 FCFA', note: 'Tri partiel inclus avant recyclage.' };
    }
    return { neighbor: '+25 000 FCFA', koryle: '-185 000 FCFA', note: 'Transport benne inclus vers PK 39.' };
  }, [selectedWaste]);

  const handleEvacuation = () => {
    if (!selectedOption) {
      Alert.alert('Option requise', 'Sélectionnez une solution avant de continuer.');
      return;
    }
    setCertificateVisible(true);
    Alert.alert('Validation enregistrée', 'Certificat ANAGED généré dans le coffre-fort.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Factory size={28} color={COLORS.orange} />
        <Text style={styles.headerTitle}>Évacuation & KÔRYLÉ</Text>
        <Text style={styles.headerSubtitle}>Comparateur de sortie des déchets chantier</Text>
      </View>

      <View style={styles.selectorCard}>
        <Text style={styles.sectionTitle}>Type de déchet</Text>
        <View style={styles.segmentColumn}>
          {wasteTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.wasteButton, selectedWaste === type && styles.wasteButtonActive]}
              onPress={() => {
                setSelectedWaste(type);
                setSelectedOption(null);
                setCertificateVisible(false);
              }}
            >
              <Recycle size={19} color={selectedWaste === type ? COLORS.black : COLORS.orange} />
              <Text style={[styles.wasteText, selectedWaste === type && styles.wasteTextActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitleLoose}>Comparateur dynamique</Text>

      <TouchableOpacity
        disabled={!pricing.neighbor}
        style={[
          styles.optionCard,
          selectedOption === 'neighbor' && styles.selectedCard,
          !pricing.neighbor && styles.disabledCard,
        ]}
        onPress={() => setSelectedOption('neighbor')}
      >
        <View style={styles.optionTop}>
          <View style={styles.optionNameRow}>
            <Truck size={24} color={pricing.neighbor ? COLORS.orange : COLORS.textSoft} />
            <Text style={styles.optionTitle}>Vendre pour Remblai</Text>
          </View>
          <Text style={[styles.gainText, !pricing.neighbor && styles.disabledText]}>{pricing.neighbor ?? 'Interdit'}</Text>
        </View>
        <Text style={styles.optionText}>Valorisation locale si le déchet est accepté.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionCard, selectedOption === 'koryle' && styles.selectedCard]}
        onPress={() => setSelectedOption('koryle')}
      >
        <View style={styles.optionTop}>
          <View style={styles.optionNameRow}>
            <Factory size={24} color={COLORS.orange} />
            <Text style={styles.optionTitle}>Envoyer à KÔRYLÉ (PK 39)</Text>
          </View>
          <Text style={styles.costText}>{pricing.koryle}</Text>
        </View>
        <Text style={styles.optionText}>{pricing.note}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={handleEvacuation}>
        <Send size={19} color={COLORS.black} />
        <Text style={styles.primaryButtonText}>Valider la sortie</Text>
      </TouchableOpacity>

      {certificateVisible && (
        <View style={styles.vaultCard}>
          <View style={styles.vaultHeader}>
            <Text style={styles.vaultTitle}>Certificat ANAGED</Text>
            <FileCheck size={24} color={COLORS.green} />
          </View>
          <Text style={styles.vaultText}>Conformité générée pour {selectedWaste}.</Text>
          <View style={styles.certificate}>
            <Text style={styles.certificateTitle}>#ANAGED-2026-KOR-039</Text>
            <Text style={styles.certificateMeta}>Dépôt validé à KÔRYLÉ PK 39 · Transport benne inclus</Text>
          </View>
        </View>
      )}
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
  header: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 22,
    paddingTop: 54,
    paddingBottom: 26,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.orange,
  },
  headerTitle: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 25,
    marginTop: 12,
  },
  headerSubtitle: {
    color: '#D1D5DB',
    fontFamily: 'Montserrat_400Regular',
    marginTop: 6,
  },
  selectorCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    margin: 18,
    padding: 16,
  },
  sectionTitle: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  sectionTitleLoose: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 19,
    marginHorizontal: 18,
    marginBottom: 12,
  },
  segmentColumn: {
    gap: 10,
  },
  wasteButton: {
    minHeight: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceMuted,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  wasteButtonActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  wasteText: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 10,
  },
  wasteTextActive: {
    color: COLORS.black,
  },
  optionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginHorizontal: 18,
    marginBottom: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCard: {
    borderColor: COLORS.orange,
    backgroundColor: COLORS.orangeSoft,
  },
  disabledCard: {
    opacity: 0.55,
  },
  optionTop: {
    gap: 10,
    marginBottom: 10,
  },
  optionNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTitle: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
    marginLeft: 10,
    flex: 1,
  },
  gainText: {
    color: COLORS.green,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
  },
  costText: {
    color: COLORS.red,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
  },
  disabledText: {
    color: COLORS.textSoft,
  },
  optionText: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
    lineHeight: 20,
  },
  primaryButton: {
    height: 58,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 18,
    marginTop: 4,
    marginBottom: 18,
  },
  primaryButtonText: {
    color: COLORS.black,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  vaultCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginHorizontal: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  vaultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vaultTitle: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
  },
  vaultText: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 12,
  },
  certificate: {
    backgroundColor: COLORS.greenSoft,
    borderRadius: 8,
    padding: 12,
  },
  certificateTitle: {
    color: COLORS.green,
    fontFamily: 'Montserrat_700Bold',
  },
  certificateMeta: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 4,
    lineHeight: 20,
  },
});
