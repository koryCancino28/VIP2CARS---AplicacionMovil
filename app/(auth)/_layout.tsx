import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="password/step1-dni" options={{ headerShown: false }} />
      <Stack.Screen name="password/step2-code" options={{ headerShown: false }} />
      <Stack.Screen name="password/step3-new-password" options={{ headerShown: false }} />
    </Stack>
  );
}