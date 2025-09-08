import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack 
      initialRouteName="(auth)/login"
      screenOptions={{ headerShown: false }}   // 👈 aquí
    >
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/welcome" />
      <Stack.Screen name="(auth)/password/step1-dni" />
      <Stack.Screen name="(auth)/password/step2-code" />
      <Stack.Screen name="(auth)/password/step3-new-password" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
