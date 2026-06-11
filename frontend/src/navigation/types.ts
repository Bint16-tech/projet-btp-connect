import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ProfileSelection: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Inventory: undefined;
  Marketplace: undefined;
  Evacuation: undefined;  // Ajoutez cette ligne
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabParamList>;
};