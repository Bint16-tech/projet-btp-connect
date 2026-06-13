import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Recycle, ShoppingBag, Tag } from 'lucide-react-native';
import { COLORS } from '../../theme/colors';

type MarketTab = 'surplus' | 'koryle';

const surplusOffers = [
  { name: 'Ciment CPJ 32.5', site: 'Chantier A', quantity: '40 sacs', price: '160 000 FCFA', discount: '-18%' },
  { name: 'Fer HA10', site: 'Promotion Riviera 4', quantity: '500 kg', price: '390 000 FCFA', discount: '-12%' },
  { name: 'Briques creuses', site: 'Chantier B', quantity: '900 unités', price: '92 000 FCFA', discount: '-20%' },
];

const recycledProducts = [
  { name: 'Granulats recyclés', recycled: '15 000 FCFA/tonne', fresh: '25 000 FCFA/tonne', saving: '10 000 FCFA' },
  { name: 'Briques recyclées', recycled: '85 FCFA/unité', fresh: '150 FCFA/unité', saving: '65 FCFA' },
  { name: 'Sable recyclé calibré', recycled: '9 500 FCFA/m³', fresh: '14 000 FCFA/m³', saving: '4 500 FCFA' },
];

export default function MarketplaceScreen() {
  const [activeTab, setActiveTab] = useState<MarketTab>('surplus');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <ShoppingBag size={28} color={COLORS.orange} />
        <Text style={styles.headerTitle}>Marketplace & Shop recyclé</Text>
        <Text style={styles.headerSubtitle}>Matériaux moins chers et catalogue KÔRYLÉ</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'surplus' && styles.tabActive]}
          onPress={() => setActiveTab('surplus')}
        >
          <Tag size={18} color={activeTab === 'surplus' ? COLORS.black : COLORS.white} />
          <Text style={[styles.tabText, activeTab === 'surplus' && styles.tabTextActive]}>Surplus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'koryle' && styles.tabActive]}
          onPress={() => setActiveTab('koryle')}
        >
          <Recycle size={18} color={activeTab === 'koryle' ? COLORS.black : COLORS.white} />
          <Text style={[styles.tabText, activeTab === 'koryle' && styles.tabTextActive]}>KÔRYLÉ</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'surplus' ? (
        <>
          <Text style={styles.sectionTitleLoose}>Surplus de chantiers</Text>
          {surplusOffers.map((offer) => (
            <View key={`${offer.name}-${offer.site}`} style={styles.card}>
              <View style={styles.offerTop}>
                <View style={styles.offerCopy}>
                  <Text style={styles.offerName}>{offer.name}</Text>
                  <Text style={styles.offerMeta}>{offer.site} · {offer.quantity}</Text>
                </View>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{offer.discount}</Text>
                </View>
              </View>
              <Text style={styles.offerPrice}>{offer.price}</Text>
              <TouchableOpacity style={styles.primaryButton} onPress={() => Alert.alert('Contact vendeur', `${offer.site} sera notifié.`)}>
                <Text style={styles.primaryButtonText}>Acheter entre collègues</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      ) : (
        <>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Produits KÔRYLÉ</Text>
            <Recycle size={22} color={COLORS.green} />
          </View>

          {recycledProducts.map((product) => (
            <View key={product.name} style={styles.card}>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Prix recyclé</Text>
                <Text style={styles.greenPrice}>{product.recycled}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Prix neuf</Text>
                <Text style={styles.oldPrice}>{product.fresh}</Text>
              </View>
              <Text style={styles.savingText}>Économie: {product.saving}</Text>
              <TouchableOpacity style={styles.catalogButton} onPress={() => Alert.alert('Commande', `${product.name} ajouté à la demande.`)}>
                <Text style={styles.catalogButtonText}>Demander un devis</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
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
  tabs: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: COLORS.black,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  tab: {
    flex: 1,
    minHeight: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: COLORS.orange,
  },
  tabText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  tabTextActive: {
    color: COLORS.black,
  },
  sectionTitleLoose: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 19,
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 19,
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
  offerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  offerCopy: {
    flex: 1,
    paddingRight: 10,
  },
  offerName: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
  },
  offerMeta: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 4,
  },
  discountBadge: {
    backgroundColor: COLORS.orangeSoft,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  discountText: {
    color: COLORS.orangeDark,
    fontFamily: 'Montserrat_700Bold',
  },
  offerPrice: {
    color: COLORS.orangeDark,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 22,
    marginBottom: 14,
  },
  primaryButton: {
    height: 52,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: COLORS.black,
    fontFamily: 'Montserrat_700Bold',
    textTransform: 'uppercase',
  },
  productName: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
    marginBottom: 14,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
  },
  greenPrice: {
    color: COLORS.green,
    fontFamily: 'Montserrat_700Bold',
  },
  oldPrice: {
    color: COLORS.textSoft,
    fontFamily: 'Montserrat_400Regular',
    textDecorationLine: 'line-through',
  },
  savingText: {
    color: COLORS.orangeDark,
    fontFamily: 'Montserrat_700Bold',
    marginTop: 6,
    marginBottom: 14,
  },
  catalogButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catalogButtonText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    textTransform: 'uppercase',
  },
});
