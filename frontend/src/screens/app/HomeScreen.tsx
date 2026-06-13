import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AlertTriangle, BarChart3, Boxes, CloudRain, Package, PlusCircle, Recycle, ShieldCheck, ShoppingBag } from 'lucide-react-native';
import { useAuth } from '../../store/AuthContext';
import { COLORS } from '../../theme/colors';

const projects = [
  { name: 'Promotion Riviera 4', stock: '48 t', savings: '125 000 FCFA', waste: 2, loss: 8 },
  { name: 'Chantier A', stock: '32 t', savings: '72 000 FCFA', waste: 5, loss: 14 },
  { name: 'Chantier B', stock: '41 t', savings: '96 000 FCFA', waste: 1, loss: 6 },
];

export default function HomeScreen() {
  const { userRole } = useAuth();
  const navigation = useNavigation<any>();

  if (userRole === 'admin') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>Supervision globale</Text>
          <Text style={styles.heroTitle}>Dashboard Admin</Text>
          <Text style={styles.heroText}>Vue consolidée de tous les projets actifs.</Text>
        </View>

        <View style={styles.widgetGrid}>
          <MetricCard icon={<Boxes size={22} color={COLORS.orange} />} label="Total matériaux en stock" value="121 t" />
          <MetricCard icon={<ShieldCheck size={22} color={COLORS.orange} />} label="Économies réalisées" value="+293 000 FCFA" />
          <MetricCard icon={<AlertTriangle size={22} color={COLORS.orange} />} label="Alertes déchets" value="8 en attente" />
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.sectionTitle}>Taux de perte</Text>
            <BarChart3 size={22} color={COLORS.orange} />
          </View>
          <LossBar label="Chantier A" value={14} />
          <LossBar label="Chantier B" value={6} />
        </View>

        <Text style={styles.sectionTitleLoose}>Projets actifs</Text>
        {projects.map((project) => (
          <TouchableOpacity
            key={project.name}
            style={styles.projectCard}
            onPress={() => navigation.navigate('ProjectDashboard', { projectName: project.name })}
          >
            <View>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectMeta}>Stock {project.stock} · pertes {project.loss}%</Text>
            </View>
            <Text style={styles.projectSavings}>{project.savings}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>Responsable chantier</Text>
        <Text style={styles.heroTitle}>Promotion Riviera 4</Text>
        <Text style={styles.heroText}>Pilotage terrain, stock et sorties de matériaux.</Text>
      </View>

      <View style={styles.weatherCard}>
        <CloudRain size={26} color={COLORS.orange} />
        <View style={styles.weatherTextBox}>
          <Text style={styles.alertTitle}>Risque de pluie</Text>
          <Text style={styles.alertText}>Protégez le ciment et bâchez les palettes exposées.</Text>
        </View>
      </View>

      <Text style={styles.sectionTitleLoose}>Actions rapides</Text>
      <TouchableOpacity style={styles.largeAction} onPress={() => navigation.navigate('Inventory')}>
        <Package size={24} color={COLORS.black} />
        <Text style={styles.largeActionText}>Mon inventaire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.largeActionDark} onPress={() => navigation.navigate('Evacuation')}>
        <Recycle size={24} color={COLORS.orange} />
        <Text style={styles.largeActionDarkText}>Gérer déblais</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.largeActionDark} onPress={() => navigation.navigate('Marketplace')}>
        <ShoppingBag size={24} color={COLORS.orange} />
        <Text style={styles.largeActionDarkText}>Vendre surplus</Text>
      </TouchableOpacity>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={styles.sectionTitle}>Profit anti-gaspillage</Text>
          <PlusCircle size={22} color={COLORS.orange} />
        </View>
        <Text style={styles.bigValue}>+125 000 FCFA</Text>
        <Text style={styles.mutedText}>Gaspillage évité ce mois sur le chantier.</Text>
      </View>
    </ScrollView>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      {icon}
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function LossBar({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.lossRow}>
      <View style={styles.lossTop}>
        <Text style={styles.lossLabel}>{label}</Text>
        <Text style={styles.lossValue}>{value}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${value * 5}%` }]} />
      </View>
    </View>
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
    paddingTop: 54,
    paddingBottom: 28,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.orange,
  },
  kicker: {
    color: COLORS.orange,
    fontFamily: 'Montserrat_700Bold',
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 8,
  },
  heroTitle: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 29,
  },
  heroText: {
    color: '#D1D5DB',
    fontFamily: 'Montserrat_400Regular',
    marginTop: 8,
    lineHeight: 22,
  },
  widgetGrid: {
    gap: 12,
    padding: 18,
  },
  metricCard: {
    backgroundColor: COLORS.black,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.orange,
  },
  metricLabel: {
    color: '#D1D5DB',
    fontFamily: 'Montserrat_400Regular',
    marginTop: 10,
  },
  metricValue: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    marginTop: 6,
  },
  panel: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 18,
    marginBottom: 18,
    padding: 16,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
  },
  sectionTitleLoose: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 19,
    marginHorizontal: 18,
    marginBottom: 12,
  },
  lossRow: {
    marginBottom: 14,
  },
  lossTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  lossLabel: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
  },
  lossValue: {
    color: COLORS.orangeDark,
    fontFamily: 'Montserrat_700Bold',
  },
  track: {
    height: 12,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceMuted,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: COLORS.orange,
  },
  projectCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 18,
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectName: {
    color: COLORS.text,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
  },
  projectMeta: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 4,
  },
  projectSavings: {
    color: COLORS.orangeDark,
    fontFamily: 'Montserrat_700Bold',
    maxWidth: 120,
    textAlign: 'right',
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
  weatherTextBox: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 17,
  },
  alertText: {
    color: '#D1D5DB',
    fontFamily: 'Montserrat_400Regular',
    marginTop: 4,
    lineHeight: 20,
  },
  largeAction: {
    minHeight: 66,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
    marginHorizontal: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  largeActionText: {
    color: COLORS.black,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 12,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  largeActionDark: {
    minHeight: 66,
    borderRadius: 8,
    backgroundColor: COLORS.black,
    marginHorizontal: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  largeActionDarkText: {
    color: COLORS.white,
    fontFamily: 'Montserrat_700Bold',
    marginLeft: 12,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  bigValue: {
    color: COLORS.orangeDark,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 29,
  },
  mutedText: {
    color: COLORS.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 6,
  },
});
