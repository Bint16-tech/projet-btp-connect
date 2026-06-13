import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Package, Recycle, ShoppingBag, User } from 'lucide-react-native';
import { AppTabParamList } from './types';
import HomeScreen from '../screens/app/HomeScreen';
import InventoryScreen from '../screens/app/InventoryScreen';
import MarketplaceScreen from '../screens/app/MarketplaceScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import EvacuationScreen from '../screens/app/EvacuationScreen';
import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.orange,
        tabBarInactiveTintColor: COLORS.textSoft,
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor: COLORS.black,
          borderTopColor: COLORS.orange,
          borderTopWidth: 2,
          elevation: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Montserrat_700Bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarLabel: 'Stock',
          tabBarIcon: ({ color, size }) => <Package color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          tabBarLabel: 'Marché',
          tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Evacuation"
        component={EvacuationScreen}
        options={{
          tabBarLabel: 'KÔRYLÉ',
          tabBarIcon: ({ color, size }) => <Recycle color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
