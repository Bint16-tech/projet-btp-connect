import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabParamList } from './types';
import HomeScreen from '../screens/app/HomeScreen';
import InventoryScreen from '../screens/app/InventoryScreen';
import MarketplaceScreen from '../screens/app/MarketplaceScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import { Home, Package, ShoppingBag, User, Recycle } from 'lucide-react-native';
import { COLORS } from '../theme/colors';
import EvacuationScreen from '../screens/app/EvacuationScreen';

// Dans le Tab.Navigator

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.orange,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
          backgroundColor: COLORS.black,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
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
          tabBarLabel: 'Inventaire',
          tabBarIcon: ({ color, size }) => <Package color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen} 
        options={{
          tabBarLabel: 'Marketplace',
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