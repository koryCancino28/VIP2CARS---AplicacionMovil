import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack initialRouteName="(auth)/login">
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/welcome" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/password/step1-dni" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/password/step2-code" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/password/step3-new-password" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
