import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../ProfileScreen';
import AboutScreen from '../AboutScreen';

export type DrawerParamList = {
  Profile: undefined;
  About: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function MenuDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Editar Perfil' }} />
      <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'Sobre' }} />
    </Drawer.Navigator>
  );
}
