// app/(auth)/login.tsx
// === Login ===
// - Inputs: DNI, Contraseña
// - Checkbox "Recordarme" (guardar token/flag en AsyncStorage)
// - Botón "Ingresar": llama Api.login(), guarda token en AuthContext, redirige a (tabs)
// - Link a recuperación: (auth)/password/step1-dni

import { Link, router } from "expo-router";
import { Button, Switch, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  // TODO: estado local para dni, password, remember, loading, error

  const onSubmit = async () => {
    // TODO:
    // 1) Validar campos
    // 2) Api.login(dni, password)
    // 3) Guardar token/usuario en AuthContext y AsyncStorage si "Recordarme"
    // 4) router.replace("(tabs)");
    router.replace("../(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 24, justifyContent: "center" }}>
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 12 }}>INICIO DE SESIÓN</Text>

      {/* DNI */}
      <Text style={{ color: "#fff" }}>DNI</Text>
      <TextInput style={{ backgroundColor: "#111", color: "#fff", borderRadius: 8, padding: 12, marginBottom: 12 }} />

      {/* Contraseña */}
      <Text style={{ color: "#fff" }}>CONTRASEÑA</Text>
      <TextInput secureTextEntry style={{ backgroundColor: "#111", color: "#fff", borderRadius: 8, padding: 12, marginBottom: 12 }} />

      {/* Recordarme */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
        <Switch />
        <Text style={{ color: "#fff", marginLeft: 8 }}>Recordarme en este dispositivo</Text>
      </View>

      <Button title="Ingresar" onPress={onSubmit} />
      <View style={{ height: 12 }} />
      <Link href="../(auth)/password/step1-dni" asChild>
        <Text style={{ color: "#E1052A" }}>¿Olvidaste tu contraseña?</Text>
      </Link>
    </View>
  );
}
