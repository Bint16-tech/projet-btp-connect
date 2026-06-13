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
  Evacuation: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabParamList>;
};

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<AppTabParamList> | undefined;
  ProjectDashboard: { projectName: string };
};
