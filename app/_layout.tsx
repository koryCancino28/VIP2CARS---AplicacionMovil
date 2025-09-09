import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack 
      initialRouteName="(auth)/login"
      screenOptions={{ headerShown: false }}   // 👈 aquí
    >
    </Stack>
  );
}
