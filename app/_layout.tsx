// app/_layout.tsx
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Oculta el header superior (opcional)
        tabBarActiveTintColor: 'blue', // Color del tab activo
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
        }}
      />
    </Tabs>
  );
}
