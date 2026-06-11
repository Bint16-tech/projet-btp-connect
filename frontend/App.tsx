import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useAppFonts } from './src/theme/fonts';
import { AuthProvider } from './src/store/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { COLORS } from './src/theme/colors';

import "./global.css";

export default function App() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.orange} />
      </View>
    );
  }

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <RootNavigator />
        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}
