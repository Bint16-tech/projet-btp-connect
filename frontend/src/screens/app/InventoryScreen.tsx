import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AlertTriangle, Barcode, Package, Plus, ShieldAlert } from 'lucide-react-native';
import { COLORS } from '../../theme/colors';

type Material = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  target: number;
};

type FormMode = 'add' | 'loss' | null;

const initialMaterials: Material[] = [
  { id: 1, name: 'Ciment', quantity: 150, unit: 'sacs', price: 4500, target: 220 },
  { id: 2, name: 'Fer', quantity: 320, unit: 'kg', price: 850, target: 500 },
  { id: 3, name: 'Briques', quantity: 1200, unit: 'unités', price: 250, target: 1600 },
];

const lossCauses = ['Casse', 'Vol', 'Pluie'];

export default function InventoryScreen() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [mode, setMode] = useState<FormMode>(null);
  const [selectedMaterial, setSelectedMaterial] = useState('Ciment');
  const [materialType, setMaterialType] = useState('Ciment');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('sacs');
  const [receipt, setReceipt] = useState('');
  const [lossCause, setLossCause] = useState('Casse');

  const totalStock = useMemo(() => materials.reduce((sum, material) => sum + material.quantity, 0), [materials]);
  const materialNames = useMemo(() => materials.map((material) => material.name), [materials]);
  const selectedUnit = materials.find((material) => material.name === selectedMaterial)?.unit ?? unit;

  const resetForm = () => {
    setQuantity('');
    setReceipt('');
    setUnit(selectedUnit);
  };

  const selectMaterial = (name: string) => {
    const selected = materials.find((material) => material.name === name);
    setSelectedMaterial(name);
    setMaterialType(name);
    setUnit(selected?.unit ?? unit);
  };

  const updateMaterialQuantity = (materialName: string, delta: number, materialUnit = selectedUnit) => {
    const normalizedName = materialName.trim();

    setMaterials((current) => {
      const existingMaterial = current.find((material) => material.name.toLowerCase() === normalizedName.toLowerCase());

      if (existingMaterial) {
        return current.map((material) =>
          material.id === existingMaterial.id
            ? { ...material, quantity: Math.max(0, material.quantity + delta), unit: material.unit || materialUnit }
            : material
        );
      }

      return [
        ...current,
        {
          id: Date.now(),
          name: normalizedName,
          quantity: Math.max(0, delta),
          unit: materialUnit || 'unités',
          price: 0,
          target: Math.max(100, delta * 2),
        },
      ];
    });
  };

  const handleAdd = () => {
    const parsedQuantity = Number(quantity);
    const typedMaterial = materialType.trim();

    if (!typedMaterial || !parsedQuantity || parsedQuantity <= 0 || !receipt) {
      Alert.alert('Ajout incomplet', 'Indiquez le type de matériau, une quantité valide et un numéro de reçu.');
      return;
    }

    updateMaterialQuantity(typedMaterial, parsedQuantity, unit || selectedUnit);
    setSelectedMaterial(typedMaterial);
    Alert.alert('Stock mis à jour', `${typedMaterial}: +${parsedQuantity} ${unit || selectedUnit}`);
    resetForm();
  };

  const handleLoss = () => {
    const parsedQuantity = Number(quantity);
    if (!parsedQuantity || parsedQuantity <= 0) {
      Alert.alert('Perte incomplète', 'Indiquez une quantité valide.');
      return;
    }

    updateMaterialQuantity(selectedMaterial, -parsedQuantity);
    Alert.alert('Perte signalée', `${lossCause}: -${parsedQuantity} ${selectedUnit}`);
    resetForm();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Package size={28} color={COLORS.orange} />
        <Text style={styles.headerTitle}>Inventaire anti-gaspillage</Text>
        <Text style={styles.headerSubtitle}>Stock total suivi: {totalStock} unités terrain</Text>
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolButton} onPress={() => Alert.alert('Scanner', 'Scan du reçu ou du sac à venir.')}>
          <Barcode size={19} color={COLORS.black} />
          <Text style={styles.toolButtonText}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toolButton, mode === 'add' && styles.toolButtonActive]} onPress={() => setMode('add')}>
          <Plus size={19} color={COLORS.black} />
          <Text style={styles.toolButtonText}>Ajouter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toolButtonDark, mode === 'loss' && styles.toolButtonDarkActive]} onPress={() => setMode('loss')}>
          <ShieldAlert size={19} color={COLORS.orange} />
          <Text style={styles.toolButtonDarkText}>Perte</Text>
        </TouchableOpacity>
      </View>

      {mode && (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>{mode === 'add' ? 'Ajout de matériaux' : 'Signalement de perte'}</Text>
          <Text style={styles.formLabel}>Type</Text>
          <View style={styles.segmentRow}>
            {materialNames.map((name) => (
              <TouchableOpacity
                key={name}
                style={[styles.segment, selectedMaterial === name && styles.segmentActive]}
                onPress={() => selectMaterial(name)}
              >
                <Text style={[styles.segmentText, selectedMaterial === name && styles.segmentTextActive]}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {mode === 'add' && (
            <TextInput
              style={styles.input}
              placeholder="Type de matériau (ex: Sable, Bois, Gravier)"
              placeholderTextColor={COLORS.textSoft}
              value={materialType}
              onChangeText={setMaterialType}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Quantité"
            placeholderTextColor={COLORS.textSoft}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />

          {mode === 'add' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Unité"
                placeholderTextColor={COLORS.textSoft}
                value={unit}
                onChangeText={setUnit}
              />
              <TextInput
                style={styles.input}
                placeholder="N° reçu"
                placeholderTextColor={COLORS.textSoft}
                value={receipt}
                onChangeText={setReceipt}
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleAdd}>
                <Text style={styles.submitButtonText}>Valider l'ajout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.formLabel}>Cause</Text>
              <View style={styles.segmentRow}>
                {lossCauses.map((cause) => (
                  <TouchableOpacity
                    key={cause}
                    style={[styles.segment, lossCause === cause && styles.segmentActive]}
                    onPress={() => setLossCause(cause)}
                  >
                    <Text style={[styles.segmentText, lossCause === cause && styles.segmentTextActive]}>{cause}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.dangerSubmitButton} onPress={handleLoss}>
                <Text style={styles.dangerSubmitButtonText}>Déduire du stock</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {materials.map((item) => {
        const fill = Math.min(100, Math.round((item.quantity / item.target) * 100));
        const lowStock = fill < 35;
        return (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={[styles.badge, lowStock ? styles.badgeDanger : styles.badgeSuccess]}>
                <Text style={[styles.badgeText, lowStock ? styles.dangerText : styles.successText]}>
                  {lowStock ? 'À surveiller' : 'Stock OK'}
                </Text>
              </View>
            </View>

            <View style={styles.gaugeTop}>
              <Text style={styles.detailValue}>{item.quantity} {item.unit}</Text>
              <Text style={styles.detailLabel}>Objectif {item.target}</Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${fill}%` }]} />
            </View>

            <View style={styles.detailsRow}>
              <Text style={styles.detailLabel}>Prix unitaire</Text>
              <Text style={styles.detailValue}>{item.price} FCFA</Text>
            </View>

            {lowStock && (
              <View style={styles.lossAlert}>
                <AlertTriangle size={18} color={COLORS.red} />
                <Text style={styles.lossAlertText}>Risque de rupture ou perte non déclarée.</Text>
              </View>
            )}
          </View>
        );
      })}
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
  toolbar: {
    flexDirection: 'row',
    gap: 8,
    padding: 14,
    backgroundColor: COLORS.black,
  },
  toolButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolButtonActive: {
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  toolButtonText: {
    color: COLORS.black,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  toolButtonDark: {
    flex: 1,
    minHeight: 54,
    borderRadius: 8,
    backgroundColor: COLORS.charcoal,
    borderWidth: 1,
    borderColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolButtonDarkActive: {
    borderColor: COLORS.white,
    borderWidth: 2,
  },
  toolButtonDarkText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    margin: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.orange,
  },
  formTitle: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 19,
    marginBottom: 14,
  },
  formLabel: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 8,
  },
  segmentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  segment: {
    minHeight: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceMuted,
    paddingHorizontal: 12,
    minWidth: 84,
  },
  segmentActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  segmentText: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 12,
  },
  segmentTextActive: {
    color: COLORS.black,
  },
  input: {
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceMuted,
    color: COLORS.text,
    fontFamily: 'Montserrat_400Regular',
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  submitButton: {
    height: 54,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: COLORS.black,
    fontFamily: 'Montserrat_700Bold',
    textTransform: 'uppercase',
  },
  dangerSubmitButton: {
    height: 54,
    borderRadius: 8,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerSubmitButtonText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginHorizontal: 18,
    marginBottom: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemName: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeSuccess: {
    backgroundColor: COLORS.greenSoft,
  },
  badgeDanger: {
    backgroundColor: COLORS.redSoft,
  },
  badgeText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 12,
  },
  successText: {
    color: COLORS.green,
  },
  dangerText: {
    color: COLORS.red,
  },
  gaugeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  track: {
    height: 13,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceMuted,
    overflow: 'hidden',
    marginBottom: 14,
  },
  fill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: COLORS.orange,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
  },
  detailValue: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
  },
  lossAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.redSoft,
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
  },
  lossAlertText: {
    color: COLORS.red,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 8,
    flex: 1,
  },
});
