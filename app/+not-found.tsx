import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Página no encontrada</Text>
      <Link href="/(auth)/login" asChild>
        <Button title="Volver al inicio" onPress={() => {}} />
      </Link>
    </View>
  );
}

