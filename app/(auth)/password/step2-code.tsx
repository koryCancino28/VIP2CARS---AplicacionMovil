// Paso 2: Código de verificación
// - Muestra "Enviamos un código al +51 9***" (con DNI del step1).
// - Input para código.
// - Botón "Continuar" → step3-new-password.
// - Link "Reenviar código" (cooldown de 30–60s).

import { router, useLocalSearchParams } from "expo-router";
import { Button, Pressable, Text, TextInput, View } from "react-native";

export default function Step2Code() {
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const onContinue = async () => {
    // await Api.verifyRecoveryCode({ dni, code });
    router.push({ pathname: "/(auth)/password/step3-new-password", params: { dni } });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 }}>
      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18, marginBottom: 8 }}>RECUPERAR CONTRASEÑA</Text>
      <Text style={{ color: "#aaa", marginBottom: 8 }}>Ingrese el código enviado al número asociado al DNI {dni}</Text>
      <TextInput style={{ backgroundColor: "#111", color: "#fff", borderRadius: 10, padding: 12, marginBottom: 16 }} />
      <Pressable onPress={() => {/* Api.resendCode(dni) */}}>
        <Text style={{ color: "#E1052A", marginBottom: 12 }}>Reenviar código</Text>
      </Pressable>
      <Button title="Continuar" onPress={onContinue} />
    </View>
  );
}