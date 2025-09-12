import { Stack } from 'expo-router';
import 'react-native-reanimated';
import CustomText from '../components/CustomText';
export { CustomText };

export default function RootLayout() {
  return (
    <Stack initialRouteName="(auth)">
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}