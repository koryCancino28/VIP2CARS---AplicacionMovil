import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        MontserratRegular: require("../assets/fonts/montserrat/Montserrat-Regular.ttf"),
        MontserratMedium: require("../assets/fonts/montserrat/Montserrat-Medium.ttf"),
        MontserratBold: require("../assets/fonts/montserrat/Montserrat-Bold.ttf"),
      });
      setLoaded(true);
    }
    loadFonts();
  }, []);

  if (!loaded) {
    return null; // 👈 loader opcional
  }

  return (
    <Stack
      initialRouteName="(auth)/login"
      screenOptions={{ headerShown: false }}
    />
  );
}
