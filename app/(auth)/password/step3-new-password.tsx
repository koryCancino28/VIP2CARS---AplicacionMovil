// Paso 3: Nueva contraseña
// - Inputs: nueva contraseña + repetir.
// - Validación (longitud, coincide).
// - Api.resetPassword({ dni, newPassword })
// - Redirige a (auth)/login con un banner de éxito.
import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, TextInput, View } from "react-native";

export default function Step3NewPassword() {
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const onSubmit = async () => {
    // await Api.resetPassword({ dni, password });
    router.replace("/(auth)/login");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 }}>
      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18, marginBottom: 12 }}>RECUPERAR CONTRASEÑA</Text>
      <TextInput placeholder="Nueva contraseña" placeholderTextColor="#666"
        secureTextEntry style={{ backgroundColor: "#111", color: "#fff", borderRadius: 10, padding: 12, marginBottom: 12 }} />
      <TextInput placeholder="Repetir contraseña" placeholderTextColor="#666"
        secureTextEntry style={{ backgroundColor: "#111", color: "#fff", borderRadius: 10, padding: 12, marginBottom: 16 }} />
      <Button title="Guardar e iniciar sesión" onPress={onSubmit} />
    </View>
  );
}