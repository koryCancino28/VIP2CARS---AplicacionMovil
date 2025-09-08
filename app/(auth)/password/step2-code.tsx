// Paso 2: Código de verificación
// - Muestra "Enviamos un código al +51 9***" (con DNI del step1).
// - Input para código.
// - Botón "Continuar" → step3-new-password.
// - Link "Reenviar código" (cooldown de 30–60s).

import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Step2Code() {
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const onContinue = async () => {
    // await Api.verifyRecoveryCode({ dni, code });
    router.push({ pathname: "/(auth)/password/step3-new-password", params: { dni } });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 }}>
      <Image
        source={require("../../../assets/images/vip2cars_logo.png")} 
        style={{ width: 350, height: 120, alignSelf: "center", marginBottom: 10, marginTop: -90 }}
        resizeMode="contain"
      />
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 24,
        }}
      >
      <Text style={{ color: "#0f0f0fff", fontWeight: "700", fontSize: 18, marginBottom: 10, alignSelf: "center" }}>RECUPERAR CONTRASEÑA</Text>
      <Text style={{ color: "#080808ff", marginBottom:10 }}>Ingrese el código enviado al número asociado al DNI {dni}</Text>
      <TextInput style={{ backgroundColor: "#ecececff", color: "#000000ff", borderRadius: 10, padding: 12, marginBottom: 16 }} />
      <Pressable onPress={() => {/* Api.resendCode(dni) */}}>
        <Text style={{ color: "#E1052A", marginBottom: 12 }}>Reenviar código</Text>
      </Pressable>
      {/* Botón personalizado */}
      <TouchableOpacity
        onPress={onContinue}
        style={{
          backgroundColor: "#E1052A", 
          paddingVertical: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Continuar</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}