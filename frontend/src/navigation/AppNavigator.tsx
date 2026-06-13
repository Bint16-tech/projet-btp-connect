import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';
import TabNavigator from './TabNavigator';
import ProjectDashboardScreen from '../screens/app/ProjectDashboardScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="ProjectDashboard" component={ProjectDashboardScreen} />
    </Stack.Navigator>
  );
}
